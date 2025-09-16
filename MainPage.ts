import { Page } from "@playwright/test";
import { MarketPage } from "../MarketPage/MarketPage";
import { SearchPage } from "../SearchPage/SearchPage";

export class MainPage extends MarketPage {
  constructor(page: Page) {
    super(page);
  }

  async searchProducts(products: string) {
    await this.header.search(products);
    await this.page.waitForLoadState();
    await this.page.waitForResponse(
      (response) => response.url().includes("/api/resolve/"),
      { timeout: 20 * 1000 }
    );
    await this.page.waitForLoadState("domcontentloaded");
    return new SearchPage(this.page);
  }
}
