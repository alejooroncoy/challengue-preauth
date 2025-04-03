import { Item } from "../gilded-rose";
import { ItemUpdater } from "./ItemUpdater";

class SulfurasUpdater implements ItemUpdater {
  private static readonly SULFURAS_QUALITY = 80; // Calidad de Sulfuras

  updateQuality(item: Item): void {
    item.quality = SulfurasUpdater.SULFURAS_QUALITY; // Sulfuras no cambia
    item.sellIn += 1; // No disminuye el sellIn
  }
}

export default SulfurasUpdater;
