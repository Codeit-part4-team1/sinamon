import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPageSchema } from "@/constants/schema";
import type { NextPageWithLayout } from "@/pages/_app";
import { useActivities } from "@/hooks/useActivities";
import { useMyActivities } from "@/hooks/useMyActivites";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import Button from "@/components/common/Button/Button";
import TitleField from "@/components/create/TitleField";
import CategoryField from "@/components/create/CategoryField";
import PriceField from "@/components/create/PriceField";
import DescriptionField from "@/components/create/DescriptionField";
import AddressField from "@/components/create/AddressField";
import SchedulesField from "@/components/create/SchedulesField";
import BannerImageUrlField from "@/components/create/BannerImageUrlField";
import SubImageUrlsField from "@/components/create/SubImageUrlsField";
import AlertModal from "@/components/common/Modal/AlertModal";

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: stringId } = router.query;
  const id = Number(stringId);

  const { data } = useActivities.getActivitiesDetail(id);

  const form = useForm<z.infer<typeof createPageSchema>>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: "",
      category: "",
      price: "",
      description: "",
      address: "",
      dateSelect: new Date(),
      startTimeSelect: new Date(new Date().setMinutes(0)),
      endTimeSelect: new Date(
        new Date().setHours(new Date().getHours() + 1, 0)
      ),
      bannerImageUrl: "",
      bannerImagePreview: "",
      subImageUrlList: [{ subImagePreview: "", subImageUrl: "" }],

      subImageUrls: [],
      subImageIdsToRemove: []
    }
  });

  useEffect(() => {
    if (data?.data) {
      form.setValue("title", data.data.title);
      form.setValue("category", data.data.category);
      form.setValue("price", data.data.price);
      form.setValue("description", data.data.description);
      form.setValue("address", data.data.address);
      form.setValue("bannerImageUrl", data.data.bannerImageUrl);
      form.setValue("bannerImagePreview", data.data.bannerImageUrl);
    }
  }, [data?.data.title]);

  const handleError = (status: number) => {
    if (status === 409) {
      dialogRef.current.showModal();
    }
  };

  const { mutate } = useMyActivities.patchMyActivityEdit(id, handleError);

  function onSubmit(values: z.infer<typeof createPageSchema>) {
    values.schedulesToAdd = values.schedules.filter(
      (ele) => ele.id === undefined
    );

    const remainSchedules = values.schedules.map((schedule) => schedule.id);

    const InitialSchedules = values.schedulesInitial.map(
      (schedule: any) => schedule.id
    );

    values.scheduleIdsToRemove = InitialSchedules.filter(
      (schedule: any) => !remainSchedules.includes(schedule)
    );

    values.subImageUrlsToAdd = values.subImageUrlList
      .filter((ele) => ele.id === undefined)
      .map((ele) => ele.subImageUrl);

    const remainSubImages = values.subImageUrlList.map(
      (subImageUrl) => subImageUrl.id
    );

    const InitialsubImages = values.subImageiInitial.map(
      (subImage: any) => subImage.id
    );

    values.subImageIdsToRemove = InitialsubImages.filter(
      (subImage: any) => !remainSubImages.includes(subImage)
    );

    values.price = Number(form.watch("price"));
    values.subImageUrls = values.subImageUrlList.map((url) => url.subImageUrl);

    const {
      dateSelect,
      schedules,
      schedulesInitial,
      startTimeSelect,
      endTimeSelect,
      bannerImageSelect,
      bannerImagePreview,
      subImageSelect,
      subImageUrlList,
      subImageUrls,
      subImageiInitial,
      ...newCreateData
    } = values;

    mutate(newCreateData);
  }

  const dialogRef = useRef<any>();

  return (
    <>
      <p className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">모임 수정</p>
      <dialog ref={dialogRef} className="rounded-lg">
        <AlertModal
          type="alert"
          size="sm"
          text="겹치는 시간대가 존재합니다"
          handlerAlertModal={() => {
            dialogRef.current.close();
          }}
        />
      </dialog>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-y-5 md:gap-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-5 md:gap-y-6">
            <TitleField />
            <div className="flex gap-x-4">
              <CategoryField />
              <PriceField />
            </div>
          </div>
          <DescriptionField />
          <AddressField />
          <SchedulesField data={data?.data.schedules} />
          <BannerImageUrlField />
          <SubImageUrlsField edit={"edit"} data={data?.data.subImages} />
          <Button
            text="수정하기"
            className="w-full md:w-96 h-12 mx-auto mt-8"
            type="submit"
          ></Button>
        </form>
      </FormProvider>
    </>
  );
};

EditPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default EditPage;
