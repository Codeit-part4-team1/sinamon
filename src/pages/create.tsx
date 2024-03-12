import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(5).max(24, {
    // message: "Username must be at least 24 characters."
  }),
  category: z.string({
    // required_error: "Please select"
  }),
  price: z.string(),
  description: z.string().min(10).max(255, {
    // message: "Username must be at least 2 characters."
  })
});

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

const CreatePage: NextPageWithLayout = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "문화 · 예술",
      price: "0"
    }
  });
  return (
    <>
      <p className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">모임 등록</p>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4 md:gap-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-4 md:gap-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-lg md:text-xl font-semibold">
                    제목
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="제목을 입력해주세요"
                      className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-lg md:text-xl font-semibold">
                      카테고리
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue="문화 · 예술"
                    >
                      <FormControl>
                        <SelectTrigger className="w-full md:w-[124px] h-10 md:h-12 px-3 md:py-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base font-medium">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="문화 · 예술"
                        >
                          문화 · 예술
                        </SelectItem>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="식음료"
                        >
                          식음료
                        </SelectItem>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="스포츠"
                        >
                          스포츠
                        </SelectItem>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="투어"
                        >
                          투어
                        </SelectItem>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="관광"
                        >
                          관광
                        </SelectItem>
                        <SelectItem
                          className="text-sm md:text-base font-medium focus:bg-sub"
                          value="웰빙"
                        >
                          웰빙
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1 md:w-32">
                    <FormLabel className="text-lg md:text-xl font-semibold">
                      가격 (원)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="가격"
                        className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-0">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-lg md:text-xl font-semibold">
                    설명
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full h-52 py-2 md:py-3 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none resize-none placeholder:text-gray-adaeb8"
                      placeholder="설명을 입력해주세요"
                      {...field}
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            text="등록하기"
            className="w-full md:w-96 h-12 mx-auto mt-8"
            type="submit"
          ></Button>
        </form>
      </Form>
    </>
  );
};

CreatePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default CreatePage;
