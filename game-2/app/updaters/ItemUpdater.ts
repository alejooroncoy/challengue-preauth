import { Item } from "../gilded-rose";

export interface ItemUpdater {
  updateQuality(item: Item): void;
}
