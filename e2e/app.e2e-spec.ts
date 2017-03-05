import { TinyCameraVisorPage } from './app.po';

describe('tiny-camera-visor App', function() {
  let page: TinyCameraVisorPage;

  beforeEach(() => {
    page = new TinyCameraVisorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
