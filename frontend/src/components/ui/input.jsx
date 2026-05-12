import { Input as AriaInput, TextField, Label, Text, FieldError, Group } from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn } from "../../utils/cn";

const inputVariants = tv({
  base: [
    "flex h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 text-base transition-all",
    "placeholder:text-gray-400",
    "focus-within:ring-4 focus-within:ring-[#aa3bff]/5 focus-within:border-[#aa3bff] focus-within:bg-white",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

const Input = ({ className, label, description, errorMessage, icon: Icon, suffix: Suffix, ...props }) => {
  return (
    <TextField
      {...props}
      className={cn("group flex flex-col gap-2", props.className)}
    >
      {label && (
        <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
          {label}
        </Label>
      )}
      <Group className={(values) => cn(inputVariants({ className: typeof className === "function" ? className(values) : className }), "relative flex items-center")}>
        {Icon && (
          <div className="absolute left-4 text-gray-400 group-focus-within:text-[#aa3bff] transition-colors">
            {Icon}
          </div>
        )}
        <AriaInput
          className={cn(
            "flex-1 bg-transparent outline-none text-gray-800 font-medium",
            Icon ? "pl-8" : "",
            Suffix ? "pr-10" : ""
          )}
        />
        {Suffix && (
          <div className="absolute right-4 text-gray-400 hover:text-[#aa3bff] transition-colors cursor-pointer">
            {Suffix}
          </div>
        )}
      </Group>
      {description && (
        <Text slot="description" className="text-xs text-muted-foreground">
          {description}
        </Text>
      )}
      <FieldError className="text-xs font-medium text-red-500 mt-1 ml-1">
        {errorMessage}
      </FieldError>
    </TextField>
  );
};

export { Input };
