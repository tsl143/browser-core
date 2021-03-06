import {
  blurUrlBar,
  $cliqzResults,
  expect,
  fastFillIn,
  mockSearch,
  testsEnabled,
  urlbar,
  waitFor,
  waitForPopup,
  withHistory } from '../helpers';

import {
  testAutocompleteArray,
  testNoAutocompleteArray
} from '../fixtures/autocompletion';

export default function () {
  if (!testsEnabled()) { return; }

  describe('autocompletion of history results', function () {
    before(function () {
      blurUrlBar();
    });

    testAutocompleteArray.forEach(function (testCase) {
      context(`query: '${testCase.query}', result url: '${testCase.results[0].url}'`, function () {
        beforeEach(async function () {
          withHistory([{ value: testCase.results[0].url }]);
          await mockSearch({ results: [] });
          fastFillIn(testCase.query);
          await waitForPopup(2);
          await waitFor(() => urlbar.mInputField.value === testCase.friendlyUrl);
        });

        it('query was autocompleted', function () {
          expect(urlbar.selectionStart).to.equal(testCase.query.length);
          expect(urlbar.selectionEnd).to.equal(testCase.friendlyUrl.length);
        });
      });
    });

    testNoAutocompleteArray.forEach(function (testCase) {
      context(`query: '${testCase.query}', result url: '${testCase.results[0].url}'`, function () {
        beforeEach(async function () {
          withHistory([{ value: testCase.results[0].url }]);
          await mockSearch({ results: [] });
          fastFillIn(testCase.query);
          await waitForPopup(3);
          await waitFor(() =>
            $cliqzResults.querySelector(`.result[href="${testCase.results[0].url}"]`));
        });

        it('query was not autocompleted', function () {
          expect(urlbar.mInputField.value).to.equal(testCase.query);
          expect(urlbar.selectionStart).to.equal(testCase.query.length);
          expect(urlbar.selectionEnd).to.equal(testCase.query.length);
        });
      });
    });
  });
}
