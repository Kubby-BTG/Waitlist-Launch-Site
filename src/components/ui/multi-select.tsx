import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-background-muted text-primary bg-background hover:bg-background/80",
        secondary:
          "border-background-muted bg-secondary text-white hover:bg-secondary/80",
        destructive:
          "border-transparent bg-primary text-white hover:bg-primary-darker",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(defaultValue);
      }
    }, [defaultValue, selectedValues]);

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <div className="relative w-full">
        <button
          ref={ref}
          {...props}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md border border-background-muted bg-background px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary",
            className,
          )}
        >
          <div className="flex flex-wrap items-center">
            {selectedValues.length > 0 ? (
              selectedValues.slice(0, maxCount).map((value) => {
                const option = options.find((o) => o.value === value);
                return (
                  <span
                    key={value}
                    className={cn(
                      isAnimating ? "animate-bounce" : "",
                      multiSelectVariants({ variant }),
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {option?.icon && <option.icon className="mr-2 h-4 w-4" />}
                    {option?.label}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOption(value);
                      }}
                    />
                  </span>
                );
              })
            ) : (
              <span className="text-primary">{placeholder}</span>
            )}
            {selectedValues.length > maxCount && (
              <span
                className={cn(
                  "border-background-muted bg-transparent text-primary hover:bg-transparent",
                  isAnimating ? "animate-bounce" : "",
                  multiSelectVariants({ variant }),
                )}
                style={{ animationDuration: `${animation}s` }}
              >
                {`+ ${selectedValues.length - maxCount} more`}
              </span>
            )}
          </div>
          <ChevronDown className="h-5 w-5 text-primary" />
        </button>
        {isOpen && (
          <div className="shadow-lg absolute z-10 mt-1 w-full rounded-md border border-background-muted bg-white">
            <div
              className="flex cursor-pointer items-center px-4 py-2 hover:bg-background"
              onClick={toggleAll}
            >
              <div
                className={`mr-2 h-5 w-5 border ${
                  selectedValues.length === options.length
                    ? "border-primary bg-primary"
                    : "border-background-muted"
                } flex items-center justify-center rounded`}
              >
                {selectedValues.length === options.length && (
                  <CheckIcon className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="text-primary">(Select All)</span>
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-background"
                onClick={() => toggleOption(option.value)}
              >
                <div
                  className={`mr-2 h-5 w-5 border ${
                    selectedValues.includes(option.value)
                      ? "border-primary bg-primary"
                      : "border-background-muted"
                  } flex items-center justify-center rounded`}
                >
                  {selectedValues.includes(option.value) && (
                    <CheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                {option.icon && (
                  <option.icon className="mr-2 h-4 w-4 text-primary" />
                )}
                <span className="text-primary">{option.label}</span>
              </div>
            ))}
            {selectedValues.length > 0 && (
              <div
                className="flex cursor-pointer items-center justify-center px-4 py-2 text-primary hover:bg-background"
                onClick={handleClear}
              >
                Clear
              </div>
            )}
          </div>
        )}
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "my-2 h-3 w-3 cursor-pointer bg-background text-primary",
              isAnimating ? "" : "text-background-muted",
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </div>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
