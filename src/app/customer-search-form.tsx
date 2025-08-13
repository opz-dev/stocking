"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BarcodeScannerButton } from "./barcode-scanner-dialog";

const searchSchema = v.object({
  membershipId: v.pipe(
    v.string(),
    v.minLength(1, "会員番号を入力してください"),
    v.regex(/^\d+$/, "数字のみ入力可能です"),
  ),
});

type SearchFormData = v.InferOutput<typeof searchSchema>;

export function StockingSearchForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: valibotResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    router.push(`/customers/${data.membershipId}`);
  };

  const handleBarcodeScan = (result: string) => {
    // バーコードから数字部分のみを抽出
    const membershipId = result.replace(/\D/g, "");
    if (membershipId) {
      setValue("membershipId", membershipId);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          {...register("membershipId")}
          placeholder="バーコードで検索"
          className="w-full bg-white"
          aria-invalid={!!errors.membershipId}
        />
        {errors.membershipId && (
          <p className="mt-1 text-sm text-destructive">
            {errors.membershipId.message}
          </p>
        )}
      </div>
      <BarcodeScannerButton onScan={handleBarcodeScan} />
      <Button type="submit" disabled={isSubmitting}>
        <Search className="mr-2 h-4 w-4" />
        検索
      </Button>
    </form>
  );
}
