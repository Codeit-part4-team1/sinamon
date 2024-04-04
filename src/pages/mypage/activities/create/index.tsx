import { ReactNode, useRef } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { createPageSchema } from "@/constants/schema";
import { queryKey } from "@/constants/queryKeys";
import type { NextPageWithLayout } from "@/pages/_app";
import { getCookie } from "@/utils/cookie";
import { usePostActivities } from "@/hooks/activities";
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

const CreatePage: NextPageWithLayout = () => {
  const form = useForm<z.infer<typeof createPageSchema>>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: "",
      category: "문화 · 예술",
      price: "",
      description: "",
      address: "",
      dateSelect: new Date(),
      startTimeSelect: new Date(new Date().setMinutes(0)),
      endTimeSelect: new Date(
        new Date().setHours(new Date().getHours() + 1, 0)
      ),
      bannerImageUrl: "",
      subImageUrls: []
    }
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  if (!getCookie("accessToken") && !getCookie("refreshToken")) {
    try {
      router.push("/signin");
    } catch (err) {
      console.error("Error occurred while redirecting to /signin:", err);
    }
  }

  const handleSuccess = () => {
    dialogRef.current.showModal();
    queryClient.invalidateQueries({
      queryKey: queryKey.myActivities,
      refetchType: "inactive"
    });
  };

  const { mutate } = usePostActivities(handleSuccess);

  function onSubmit(values: z.infer<typeof createPageSchema>) {
    values.price = Number(form.watch("price"));
    values.subImageUrls = values.subImageUrlList.map((url) => url.subImageUrl);

    const {
      schedulesInitial,
      dateSelect,
      startTimeSelect,
      endTimeSelect,
      bannerImageSelect,
      bannerImagePreview,
      subImageSelect,
      subImageUrlList,
      subImageiInitial,
      ...newCreateData
    } = values;

    mutate(newCreateData);
  }

  const dialogRef = useRef<any>();

  return (
    <>
      <p className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">모임 등록</p>
      <dialog ref={dialogRef} className="rounded-lg">
        <AlertModal
          type="alert"
          size="sm"
          text="모임이 생성되었습니다"
          handlerAlertModal={() => {
            router.push(`/mypage/activities`);
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
          <SchedulesField />
          <BannerImageUrlField />
          <SubImageUrlsField />
          <Button
            text="등록하기"
            className="w-full md:w-96 h-12 mx-auto mt-8"
            type="submit"
          ></Button>
        </form>
      </FormProvider>
    </>
  );
};

CreatePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default CreatePage;
