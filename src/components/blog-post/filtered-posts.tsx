"use client";

import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

import { Fragment, useState } from "react";
import CuratedPosts from "@/components/blog-post/curated-posts";

export default function FilteredPosts() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  return (
    <>
      {/* Filter */}
      <div className="flex flex-col gap-2 md:flex-row">
        {/* Platform */}
        <div className={"relative w-full md:max-w-[15.5rem]"}>
          <MultiSelect
            options={platforms.map((platform) => ({
              label: platform,
              value: platform,
            }))}
            defaultValue={[]}
            onValueChange={(val) => setSelectedPlatforms(val)}
            value={selectedPlatforms}
            placeholder={"Platform"}
          />
        </div>

        {/* Category */}
        <div className={"relative w-full md:max-w-[15.5rem]"}>
          <MultiSelect
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            defaultValue={[]}
            onValueChange={(val) => setSelectedCategories(val)}
            value={selectedCategories}
            placeholder={"Category"}
          />
        </div>

        {/* Topic */}
        <div className={"relative w-full md:max-w-[15.5rem]"}>
          <MultiSelect
            options={topics.map((topic) => ({ label: topic, value: topic }))}
            defaultValue={[]}
            onValueChange={(val) => setSelectedTopics(val)}
            value={selectedTopics}
            placeholder={"Topic"}
          />
        </div>

        <Button>Filter</Button>
      </div>
    </>
  );
}

const platforms = ["Kubby Mobile", "Kubby Web"];

const categories = [
  "E-Commerce",
  "Packages",
  "Sustainability",
  "Spaces",
  "Updates",
];

const topics = [
  "Online Shopping",
  "Shop Local",
  "Returns",
  "Delivery",
  "Lost/Theft Package",
  "Missed/Late Deliveries",
  "Local Community",
  "Company updates",
  "App Updates",
  "News",
  "Social Media",
];
