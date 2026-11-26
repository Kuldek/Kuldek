import assert from 'node:assert/strict';
import test from 'node:test';
import { ScriptReview } from './script-review.mjs';

test('the final reviewer must wait for editorial approval on the same version', () => {
  const script = new ScriptReview('A kite lifts into the air.');
  assert.throws(() => script.approve('final', 1), /Editorial approval must come first/);
  assert.equal(script.read().final, false);
  script.approve('editorial', 1);
  script.approve('final', 1);
  assert.equal(script.read().final, true);
});

test('editing starts a fresh pair of approvals and preserves the approved original', () => {
  const script = new ScriptReview('A kite lifts into the air.');
  script.approve('editorial', 1);
  script.approve('final', 1);
  script.revise(1, 'A kite lands in a meadow.');

  assert.deepEqual(script.read(), {
    version: 2, text: 'A kite lands in a meadow.', editorial: false, final: false,
  });
  assert.deepEqual(script.read(1), {
    version: 1, text: 'A kite lifts into the air.', editorial: true, final: true,
  });
  assert.throws(() => script.approve('final', 2), /Editorial approval must come first/);
  script.approve('editorial', 2);
  script.approve('final', 2);
  assert.equal(script.read().final, true);
});

test('a stale revision or approval cannot change the current draft or its history', () => {
  const script = new ScriptReview('A train arrives.');
  script.revise(1, 'A train leaves.');
  for (const stage of ['editorial', 'final']) {
    assert.throws(() => script.approve(stage, 1), /out of date/);
  }
  assert.throws(() => script.revise(1, 'A train stops.'), /out of date/);
  assert.equal(script.version, 2);
  assert.equal(script.read(1).editorial, false);
  assert.equal(script.read().editorial, false);
  assert.equal(script.read().text, 'A train leaves.');
});

test('an empty or unchanged edit keeps the approval already given', () => {
  const script = new ScriptReview('A lantern glows.');
  script.approve('editorial', 1);
  assert.throws(() => script.revise(1, ' '), /needs some text/);
  assert.throws(() => script.revise(1, ' A lantern glows. '), /Change the script/);
  assert.equal(script.version, 1);
  assert.equal(script.read().editorial, true);
});
