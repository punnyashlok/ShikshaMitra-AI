import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
} from "lucide-react";

import type { Flashcard } from "../services/flashcards";

interface Props {
  flashcards: Flashcard[];
}

export default function FlashcardViewer({
  flashcards,
}: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = useMemo(() => flashcards[index], [flashcards, index]);

  function previous() {
    setFlipped(false);

    setIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  }

  function next() {
    setFlipped(false);

    setIndex((prev) =>
      prev === flashcards.length - 1 ? 0 : prev + 1
    );
  }

  function randomCard() {
    setFlipped(false);

    setIndex(Math.floor(Math.random() * flashcards.length));
  }

  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 rounded-3xl bg-slate-900 p-8">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          🃏 Flashcards
        </h2>

        <span className="rounded-xl bg-slate-800 px-4 py-2">
          {index + 1} / {flashcards.length}
        </span>

      </div>

      <div
        onClick={() => setFlipped((prev) => !prev)}
        className="flex h-80 cursor-pointer items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-center shadow-xl transition hover:scale-[1.02]"
      >
        <div>

          <h3 className="mb-4 text-2xl font-bold">
            {flipped ? "Answer" : "Question"}
          </h3>

          <p className="text-xl leading-8">
            {flipped ? card.back : card.front}
          </p>

        </div>
      </div>

      <p className="mt-4 text-center text-slate-400">
        Click the card to flip
      </p>

      <div className="mt-8 flex justify-center gap-5">

        <button
          onClick={previous}
          className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => setFlipped((prev) => !prev)}
          className="rounded-xl bg-cyan-600 p-4 hover:bg-cyan-700"
        >
          <RotateCcw />
        </button>

        <button
          onClick={randomCard}
          className="rounded-xl bg-purple-600 p-4 hover:bg-purple-700"
        >
          <Shuffle />
        </button>

        <button
          onClick={next}
          className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700"
        >
          <ChevronRight />
        </button>

      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-700">

        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
          style={{
            width: `${((index + 1) / flashcards.length) * 100}%`,
          }}
        />

      </div>

    </div>
  );
}