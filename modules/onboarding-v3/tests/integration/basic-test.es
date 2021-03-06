import {
  expect,
  focusOnTab,
  waitForElement,
  click,
  waitFor,
  getTab,
  newTab
} from '../../../tests/core/test-helpers';
import config from '../../../core/config';

const onboardingUrl = config.settings.ONBOARDING_URL;

export default function () {
  let tabId;

  describe('onboarding-v3', function () {
    beforeEach(async function () {
      tabId = await newTab(onboardingUrl, true);
      await waitForElement({
        url: onboardingUrl,
        selector: '#cqb-start-btn',
      });
      await focusOnTab(tabId);
    });

    context('on start button click', function () {
      it('opens new tab page', async function () {
        await click(onboardingUrl, '#cqb-start-btn');
        return waitFor(
          () => expect(getTab(tabId)).to.have.property('url').that.equals(config.settings.NEW_TAB_URL),
          500,
        );
      });
    });
  });
}
