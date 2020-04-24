import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../models/Movie.model';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService,
              private router: Router) {}

  ngOnInit() {
    this.movie = new Movie('', '', '', '');
    const id = this.route.snapshot.params.id;
    this.moviesService.getSingleMovie(+id).then(
      (movie: Movie) => {
        this.movie = movie;
      }
    );
  }

  onBack() {
    this.router.navigate(['/movies']);
  }

}
