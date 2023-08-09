import { useFeature } from "@growthbook/growthbook-react";
import React from "react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

const prompt = "prompt";
const brainName = "brain";

export const ChatMessage = React.forwardRef(
  (
    { speaker, text }: { speaker: string; text: string },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const isNewUxOn = useFeature("new-ux").on;

    const isUserSpeaker = speaker === "user";
    const containerClasses = cn(
      "py-3 px-5 w-fit ",
      isUserSpeaker
        ? "bg-gray-100 bg-opacity-60 items-start "
        : "bg-purple-100 bg-opacity-60 items-end",
      "dark:bg-gray-800 rounded-3xl flex flex-col overflow-hidden scroll-pb-32"
    );

    const containerWrapperClasses = cn(
      "flex flex-col",

      isUserSpeaker ? "items-start " : "items-end"
    );

    const markdownClasses = cn(
      "prose",
      isUserSpeaker ? "dark:prose-invert" : "dark:prose"
    );

    return (
      <div className={containerWrapperClasses}>
        {" "}
        <div ref={ref} className={containerClasses}>
          {isNewUxOn && (
            <span
              data-testid="brain-prompt-tags"
              className="text-gray-400 mb-1"
            >
              @{brainName} #{prompt}
            </span>
          )}
          <div data-testid="chat-message-text">
            <ReactMarkdown className={markdownClasses}>{text}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";
