import {Injectable} from "@angular/core";
import {CategoryModel} from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryFactory {

  public create(id: number, name: string): CategoryModel {
    return new CategoryModel(id, name);
  }

}
