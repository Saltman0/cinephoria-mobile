import {Injectable} from "@angular/core";
import {CategoryModel} from "../models/category.model";
import {MovieModel} from "../models/movie.model";

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

  public create(
    id: number,
    title: string,
    description: string,
    minimumAge: number,
    favorite: boolean,
    imageURL: string,
    category: CategoryModel
  ): MovieModel {
    return new MovieModel(id, title, description, minimumAge, favorite, imageURL, category);
  }

}
