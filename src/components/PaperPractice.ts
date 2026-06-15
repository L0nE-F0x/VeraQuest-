import { sounds } from '../utils/sounds';

/**
 * PaperPractice — a printable, off-screen practice pack for working on paper.
 * Covers the things a screen quiz can't: extended writing and longer written
 * comprehension, plus mixed Math and Science short-answer questions and an
 * answer key for a parent. Aligned to Cambridge Primary Stage 5.
 *
 * Printing opens a dedicated window with its own print stylesheet, so it is not
 * affected by the app's other @media print rules (e.g. the certificate).
 */
export class PaperPractice {
  private container: HTMLDivElement;
  private onClose: () => void;

  constructor(parent: HTMLElement, onClose: () => void) {
    this.onClose = onClose;

    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.right = '0';
    this.container.style.bottom = '0';
    this.container.style.backgroundColor = 'var(--color-sand)';
    this.container.style.zIndex = '250';
    this.container.className = 'screen';
    this.container.style.overflowY = 'auto';
    parent.appendChild(this.container);

    this.render();
  }

  private lines(n: number): string {
    let s = '';
    for (let i = 0; i < n; i++) s += '<div class="ws-line"></div>';
    return s;
  }

  /** The worksheet body — shared by the on-screen preview and the print window. */
  private buildWorksheetHTML(): string {
    return `
      <div class="ws">
        <div class="ws-head">
          <h1>VeraQuest · Paper Practice Pack</h1>
          <p class="ws-sub">Cambridge Primary Stage 5 — English, Mathematics &amp; Science</p>
          <div class="ws-namebar">
            <span>Name: ____________________</span>
            <span>Date: ______________</span>
            <span>Score: ______ / ______</span>
          </div>
        </div>

        <!-- ============ ENGLISH ============ -->
        <section class="ws-section">
          <h2>Part 1 · English — Reading Comprehension</h2>
          <p class="ws-instr">Read the passage carefully, then answer the questions in full sentences.</p>
          <div class="ws-passage">
            <h3>The Signal Fire</h3>
            <p>For three nights, the storm had trapped Mara and her grandfather on the tiny island. Their little boat lay cracked on the rocks, and the radio had fallen silent. On the fourth evening, the wind finally dropped.</p>
            <p>Grandfather rubbed his tired eyes. &ldquo;We must light a fire on the headland,&rdquo; he said quietly. &ldquo;A ship may pass at dawn.&rdquo; Mara gathered driftwood while the last light faded. Her fingers were numb, but she did not complain.</p>
            <p>When the fire at last roared into the darkness, she felt a flicker of hope for the first time in days. Far out at sea, a faint light blinked &mdash; once, twice &mdash; and then turned slowly towards the island.</p>
          </div>

          <ol class="ws-questions">
            <li>How many nights had the storm trapped Mara and her grandfather before the wind dropped?${this.lines(1)}</li>
            <li>The passage says Mara&rsquo;s fingers were &ldquo;numb&rdquo;. What does this tell you about her fingers?${this.lines(1)}</li>
            <li>How do you think Mara was feeling at the <strong>start</strong> of the passage? Use evidence from the text to explain your answer.${this.lines(2)}</li>
            <li>Why did Grandfather want to light a fire on the headland?${this.lines(2)}</li>
            <li>What do you think the blinking light far out at sea was, and what might happen next? Explain using clues from the text.${this.lines(2)}</li>
          </ol>
        </section>

        <section class="ws-section">
          <h2>Part 2 · English — Writing</h2>
          <p class="ws-instr">Choose <strong>one</strong> task. Write at least one full paragraph. Plan for a minute before you start.</p>
          <p class="ws-choice"><strong>A.</strong> Continue the story: write what happens when the ship reaches the island. Include some speech.</p>
          <p class="ws-choice"><strong>B.</strong> Write a diary entry as Mara on the fourth night, describing how she feels.</p>
          <div class="ws-checklist">
            <strong>Check your writing has:</strong>
            <span>☐ paragraphs</span>
            <span>☐ capital letters &amp; full stops</span>
            <span>☐ correctly punctuated speech (&ldquo; &rdquo;)</span>
            <span>☐ a simile or vivid description</span>
            <span>☐ varied sentence openings</span>
            <span>☐ checked spelling</span>
          </div>
          ${this.lines(10)}
        </section>

        <!-- ============ MATHEMATICS ============ -->
        <section class="ws-section">
          <h2>Part 3 · Mathematics</h2>
          <p class="ws-instr">Show your working in the space beside each question.</p>
          <ol class="ws-questions ws-math">
            <li>Write the value of the digit <strong>3</strong> in the number <strong>5.32</strong>.${this.lines(1)}</li>
            <li>Calculate: <strong>5 + 4 &times; 2 = </strong>${this.lines(1)}</li>
            <li>Round <strong>7.6</strong> to the nearest whole number.${this.lines(1)}</li>
            <li>Calculate: <strong>3.4 &times; 100 = </strong>${this.lines(1)}</li>
            <li>Calculate: <strong>2/5 + 1/5 = </strong>${this.lines(1)}</li>
            <li>Find <strong>1/4 of 20</strong>.${this.lines(1)}</li>
            <li>Two angles sit on a straight line. One is <strong>130&deg;</strong>. Find the other.${this.lines(1)}</li>
            <li>A rectangle is <strong>8 cm</strong> long and <strong>5 cm</strong> wide. Find its <strong>perimeter</strong> and its <strong>area</strong>.${this.lines(2)}</li>
            <li>Find the <strong>mode</strong> and the <strong>median</strong> of: 3, 7, 3, 9, 8${this.lines(2)}</li>
            <li>The temperature is <strong>4&deg;C</strong> and falls by <strong>9&deg;C</strong>. What is the new temperature?${this.lines(1)}</li>
          </ol>
        </section>

        <!-- ============ SCIENCE ============ -->
        <section class="ws-section">
          <h2>Part 4 · Science</h2>
          <p class="ws-instr">Answer in short, clear sentences.</p>
          <ol class="ws-questions">
            <li>Name <strong>two</strong> forces that can slow down a moving object.${this.lines(1)}</li>
            <li>How is a sound made?${this.lines(1)}</li>
            <li>Name one <strong>magnetic</strong> material and one metal that is <strong>not</strong> magnetic.${this.lines(1)}</li>
            <li>Describe how the particles are arranged in a <strong>solid</strong>.${this.lines(1)}</li>
            <li>Name the part of a flower that <strong>makes</strong> pollen and the part that <strong>receives</strong> it.${this.lines(1)}</li>
            <li>Put these digestive organs in the correct order: stomach, mouth, small intestine, oesophagus.${this.lines(1)}</li>
            <li>Name the three main steps of the <strong>water cycle</strong>.${this.lines(1)}</li>
            <li>In a fair test, what are the three kinds of <strong>variables</strong>?${this.lines(1)}</li>
          </ol>
        </section>

        <!-- ============ ANSWER KEY ============ -->
        <section class="ws-section ws-answers">
          <h2>Answer Key <span class="ws-parent">(for parents)</span></h2>
          <p class="ws-instr">Reading and writing answers will vary — accept any sensible answer supported by the text. Suggested answers below.</p>
          <h3>English — Comprehension</h3>
          <ol>
            <li>Three nights (the wind dropped on the fourth evening).</li>
            <li>That they had lost feeling / were very cold from the cold and wind.</li>
            <li>Worried, trapped or low in hope — she &ldquo;felt a flicker of hope for the first time in days,&rdquo; which suggests she had felt hopeless before.</li>
            <li>As a signal, so that a passing ship would see them and rescue them.</li>
            <li>A ship — it &ldquo;turned slowly towards the island,&rdquo; so they are likely to be rescued.</li>
          </ol>
          <h3>Writing</h3>
          <p>Mark using the checklist: paragraphs, capitals/full stops, punctuated speech, a simile/vivid description, varied openings, accurate spelling.</p>
          <h3>Mathematics</h3>
          <ol>
            <li>3 tenths (0.3)</li>
            <li>13 (multiply before adding: 4&times;2=8, then 5+8)</li>
            <li>8</li>
            <li>340</li>
            <li>3/5</li>
            <li>5</li>
            <li>50&deg; (180 &minus; 130)</li>
            <li>Perimeter = 26 cm; Area = 40 cm&sup2;</li>
            <li>Mode = 3; Median = 7 (ordered: 3, 3, 7, 8, 9)</li>
            <li>&minus;5&deg;C</li>
          </ol>
          <h3>Science</h3>
          <ol>
            <li>Friction, air resistance, water resistance (any two).</li>
            <li>By something vibrating.</li>
            <li>Magnetic: iron or steel (or nickel). Not magnetic: copper, aluminium or gold.</li>
            <li>Tightly packed together in fixed positions.</li>
            <li>Makes pollen: the anther. Receives pollen: the stigma.</li>
            <li>Mouth &rarr; oesophagus &rarr; stomach &rarr; small intestine.</li>
            <li>Evaporation, condensation, precipitation.</li>
            <li>Independent, dependent and control variables.</li>
          </ol>
        </section>

        <p class="ws-foot">VeraQuest · Grade 6 Ready — keep practising a little every day. You&rsquo;ve got this! 🌱</p>
      </div>
    `;
  }

  private printCSS(): string {
    return `
      * { box-sizing: border-box; }
      body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; margin: 0; padding: 24px; line-height: 1.5; }
      .ws-head { text-align: center; border-bottom: 3px double #333; padding-bottom: 10px; margin-bottom: 18px; }
      .ws-head h1 { font-family: Arial, sans-serif; font-size: 22px; margin: 0 0 4px; }
      .ws-sub { font-size: 13px; color: #444; margin: 0 0 10px; }
      .ws-namebar { display: flex; justify-content: space-between; font-size: 13px; font-family: Arial, sans-serif; }
      .ws-section { page-break-before: always; margin-top: 8px; }
      .ws-section:first-of-type { page-break-before: avoid; }
      h2 { font-family: Arial, sans-serif; font-size: 17px; background: #f0f0f0; padding: 6px 10px; border-left: 5px solid #555; }
      h3 { font-family: Arial, sans-serif; font-size: 14px; margin: 14px 0 6px; }
      .ws-instr { font-style: italic; font-size: 13px; color: #333; }
      .ws-passage { border: 1px solid #bbb; background: #fafafa; padding: 12px 16px; border-radius: 6px; }
      .ws-passage h3 { margin-top: 0; }
      .ws-passage p { margin: 0 0 8px; }
      ol.ws-questions { padding-left: 22px; }
      ol.ws-questions li { margin-bottom: 10px; }
      .ws-line { border-bottom: 1px solid #999; height: 22px; margin: 6px 0; }
      .ws-choice { margin: 6px 0; }
      .ws-checklist { display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 12px; font-family: Arial, sans-serif; background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 8px 0; }
      .ws-checklist strong { width: 100%; }
      .ws-answers { background: #f7f7f7; border: 1px dashed #888; padding: 10px 14px; border-radius: 6px; }
      .ws-answers ol { padding-left: 20px; }
      .ws-answers li { margin-bottom: 3px; font-size: 13px; }
      .ws-parent { font-size: 12px; font-weight: normal; color: #666; }
      .ws-foot { text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #555; margin-top: 16px; }
      @media print { body { padding: 0; } }
    `;
  }

  private render() {
    this.container.innerHTML = `
      <div class="paper-practice-screen">
        <div class="dashboard-header" style="margin-bottom:16px;">
          <h2 class="text-gradient-teal" style="font-size:1.6rem;">Paper Practice Pack 🖨️</h2>
          <p style="font-size:0.85rem; color:var(--color-text-muted); margin-top:4px;">
            A printable worksheet for working away from the screen — reading comprehension, a writing task, and mixed Math &amp; Science questions. The answer key at the end is for you, Mum &amp; Dad.
          </p>
        </div>

        <div style="display:flex; gap:12px; padding:0 16px 16px;">
          <button class="btn-secondary" id="btn-pp-back" style="flex:1;">Back</button>
          <button class="btn-primary" id="btn-pp-print" style="flex:2;">🖨️ Print / Save as PDF</button>
        </div>

        <div class="paper-preview">
          ${this.buildWorksheetHTML()}
        </div>
      </div>
    `;

    this.container.querySelector('#btn-pp-back')?.addEventListener('click', () => {
      sounds.playPop();
      this.destroy();
      this.onClose();
    });

    this.container.querySelector('#btn-pp-print')?.addEventListener('click', () => {
      sounds.playQuestSelect();
      this.printPack();
    });
  }

  private printPack() {
    const w = window.open('', '_blank', 'width=820,height=1000');
    if (!w) {
      alert('Please allow pop-ups for this site so the practice pack can open in a new tab to print.');
      return;
    }
    w.document.write(
      `<!doctype html><html><head><meta charset="utf-8" />` +
      `<title>VeraQuest — Paper Practice Pack</title>` +
      `<style>${this.printCSS()}</style></head><body>` +
      this.buildWorksheetHTML() +
      `</body></html>`
    );
    w.document.close();
    w.focus();
    setTimeout(() => { try { w.print(); } catch (e) { /* user can print manually */ } }, 350);
  }

  private destroy() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
