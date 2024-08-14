"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/multi-select";

export default function FilteredPosts({
  handleRunFilter,
}: {
  handleRunFilter: ({ categories }: { categories: string[] }) => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  // const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  return (
    <>
      {/* Filter */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-6">
        {/* Category */}
        <div className={"relative w-full md:max-w-[15.5rem]"}>
          <MultiSelect
            values={categories.map((category, i) => ({
              key: category,
              value: category,
            }))}
            label={"Category"}
            selectedItems={selectedCategories}
            setSelectedItems={setSelectedCategories}
          />
        </div>

        {/* Topic */}
        {/* <div className={"relative w-full md:max-w-[15.5rem]"}>
          <MultiSelect
            values={topics.map((topic, i) => ({
              key: topic,
              value: topic,
            }))}
            label={"Topic"}
            selectedItems={selectedTopics}
            setSelectedItems={setSelectedTopics}
          />
        </div> */}

        <Button
          className={"md:h-[3.125rem] md:px-6"}
          onClick={() => {
            handleRunFilter({ categories: selectedCategories });
          }}
        >
          Filter
        </Button>
      </div>
    </>
  );
}

// const platforms = ["Kubby Mobile", "Kubby Web"];
const categories = ["E-Commerce", "Packages", "Sustainability", "Spaces", "Updates"];
// const topics = [
//   "Online Shopping",
//   "Shop Local",
//   "Returns",
//   "Delivery",
//   "Lost/Theft Package",
//   "Missed/Late Deliveries",
//   "Local Community",
//   "Company updates",
//   "App Updates",
//   "News",
//   "Social Media",
// ];
