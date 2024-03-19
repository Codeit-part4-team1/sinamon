import React, { type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPageSchema } from "@/constants/schema";
import type { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { Form } from "@/components/ui/form";
import Button from "@/components/common/Button";
import TitleField from "@/components/create/TitleField";
import CategoryField from "@/components/create/CategoryField";
import PriceField from "@/components/create/PriceField";
import DescriptionField from "@/components/create/DescriptionField";
import AddressField from "@/components/create/AddressField";
import Schedules from "@/components/create/Schedules";
import BannerImageUrlField from "@/components/create/BannerImageUrlField";
import SubImageUrls from "@/components/create/SubImageUrls";

const CreatePage: NextPageWithLayout = () => {
  const form = useForm<z.infer<typeof createPageSchema>>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: "",
      category: "문화 · 예술",
      price: "",
      description: "",
      address: "",
      addressObject: {
        postcode: "",
        roadAddress: "",
        detailAddress: ""
      },
      dateSelect: new Date(),
      startTimeSelect: new Date(new Date().setMinutes(0)),
      endTimeSelect: new Date(
        new Date().setHours(new Date().getHours() + 1, 0)
      ),
      bannerImageUrl: "",
      subImageUrls: []
    }
  });

  function onSubmit(values: z.infer<typeof createPageSchema>) {
    values.address = `${values.addressObject.roadAddress} ${values.addressObject.detailAddress}`;
    values.subImageUrls = values.subImageUrlList.map((url) => url.subImageUrl);
    values.schedules.forEach((schedule) => {
      const [year, month, day] = schedule.date
        .replace("년", "")
        .replace("월", "")
        .replace("일", "")
        .split(" ");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      schedule.date = formattedDate;
    });

    const {
      addressObject,
      dateSelect,
      startTimeSelect,
      endTimeSelect,
      bannerImageSelect,
      subImageSelect,
      subImageUrlList,
      ...newCreateData
    } = values;

    console.log(newCreateData);
  }

  return (
    <>
      <p className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">모임 등록</p>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-5 md:gap-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-5 md:gap-y-6">
            <TitleField useForm={form} />
            <div className="flex gap-x-4">
              <CategoryField useForm={form} />
              <PriceField useForm={form} />
            </div>
          </div>
          <DescriptionField useForm={form} />
          <AddressField useForm={form} />
          <Schedules useForm={form} />
          <BannerImageUrlField useForm={form} />
          <SubImageUrls useForm={form} />
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
