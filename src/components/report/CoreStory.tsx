import { RichText } from "@/components/report/RichText";
import { Section } from "@/components/report/Section";
import type { DetailedReport } from "@/lib/types";

export function CoreStory({ story }: { story: DetailedReport["coreStory"] }) {
  return (
    <Section id="core-story" eyebrow="The big picture" title={story.title}>
      <RichText text={story.body} className="max-w-[70ch] text-[1.05rem]" />
    </Section>
  );
}
