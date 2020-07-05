import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import {Movie} from '../../models/Movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movieForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      actor: ['', Validators.required],
      gender: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveMovie() {
    const title = this.movieForm.get('title').value;
    const director = this.movieForm.get('director').value;
    const actor = this.movieForm.get('actor').value;
    const gender = this.movieForm.get('gender').value;
    const synopsis = this.movieForm.get('synopsis').value;
    const newMovie = new Movie(title, director, actor, gender);
    newMovie.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newMovie.poster = this.fileUrl;
    }
    this.moviesService.createNewMovie(newMovie);
    this.router.navigate(['/movie']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.moviesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
