import { pathToFileURL } from 'node:url';

function cleanText(text) {
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('A script needs some text.');
  }
  return text.trim();
}

export class ScriptReview {
  #versions;

  constructor(text) {
    this.#versions = [{ text: cleanText(text), editorial: false, final: false }];
  }

  get version() {
    return this.#versions.length;
  }

  read(version = this.version) {
    if (!Number.isInteger(version) || version < 1 || version > this.version) {
      throw new Error('Unknown script version.');
    }
    return { version, ...this.#versions[version - 1] };
  }

  #checkVersion(expectedVersion) {
    if (this.version !== expectedVersion) {
      throw new Error(`Version ${expectedVersion} is out of date. Open version ${this.version}.`);
    }
  }

  revise(expectedVersion, text) {
    this.#checkVersion(expectedVersion);
    const revisedText = cleanText(text);
    if (revisedText === this.read().text) {
      throw new Error('Change the script text before creating a revision.');
    }
    this.#versions.push({ text: revisedText, editorial: false, final: false });
  }

  approve(stage, expectedVersion) {
    this.#checkVersion(expectedVersion);
    if (stage !== 'editorial' && stage !== 'final') {
      throw new Error('Choose editorial or final review.');
    }
    const draft = this.#versions[expectedVersion - 1];
    if (stage === 'final' && !draft.editorial) {
      throw new Error('Editorial approval must come first for this version.');
    }
    draft[stage] = true;
  }
}

function show(script, version) {
  const draft = script.read(version);
  console.log(`v${draft.version} | editorial ${draft.editorial ? 'approved' : 'pending'} | final ${draft.final ? 'approved' : 'pending'}`);
  console.log(`  "${draft.text}"`);
}

function runExample() {
  const script = new ScriptReview('A paper boat rests on a blue table.');
  console.log('First draft');
  show(script);

  script.approve('editorial', 1);
  script.approve('final', 1);
  console.log('\nBoth reviewers approved the first draft');
  show(script);

  script.revise(1, 'A paper boat drifts across a puddle.');
  console.log('\nThe revised ending needs a new review');
  show(script);
  try {
    script.approve('final', 1);
  } catch (error) {
    console.log(`  Previous review link: ${error.message}`);
  }

  script.approve('editorial', 2);
  script.approve('final', 2);
  console.log('\nReview history');
  show(script, 1);
  show(script, 2);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runExample();
}
