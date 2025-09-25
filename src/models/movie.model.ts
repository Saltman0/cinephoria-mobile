import {CategoryModel} from "./category.model";

export class MovieModel {
  id: number;
  title: string;
  description: string;
  minimumAge: number;
  favorite: boolean;
  imageURL: string;
  category: CategoryModel;

  constructor(
    id: number,
    title: string,
    description: string,
    minimumAge: number,
    favorite: boolean,
    imageURL: string,
    category: CategoryModel
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.minimumAge = minimumAge;
    this.favorite = favorite;
    this.imageURL = imageURL;
    this.category = category;
  }
}
