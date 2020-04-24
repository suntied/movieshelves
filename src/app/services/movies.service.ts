import { Injectable } from '@angular/core';
import {Movie} from '../models/Movie.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: Movie[] = [];
  movieSubject = new Subject<Movie[]>();

  constructor() {
    this.getMovies();
  }

  emitMovies(){
    this.movieSubject.next(this.movies);
  }

  saveMovies(){
    firebase.database().ref('/movies').set(this.movies);
  }

  getMovies() {
    firebase.database().ref('/movies').on('value', (data) => {
      this.movies = data.val() ? data.val() : [];
      this.emitMovies();
    });
  }

  getSingleMovie(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/movies/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewMovie(newMovie: Movie){
    this.movies.push(newMovie);
    this.saveMovies();
    this.emitMovies();
  }

  removeMovie(movie: Movie) {
    const movieIndexToRemove = this.movies.findIndex(
      (movieEl) => {
        if (movieEl === movie) {
          return true;
        }
      }
    );
    this.movies.splice(movieIndexToRemove, 1);
    this.saveMovies();
    this.emitMovies();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
