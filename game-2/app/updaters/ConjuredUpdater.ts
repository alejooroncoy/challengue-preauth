import { GildedRose, Item } from "../gilded-rose";
import { ItemUpdater } from "./ItemUpdater";

class ConjuredUpdater implements ItemUpdater {
  updateQuality(item: Item): void {
    item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - 2); // Conjured items disminuyen su calidad el doble
  }
}

export default ConjuredUpdater;
