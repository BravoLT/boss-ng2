import { BossNg2Page } from './app.po';

describe('boss-ng2 App', function() {
  let page: BossNg2Page;

  beforeEach(() => {
    page = new BossNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
