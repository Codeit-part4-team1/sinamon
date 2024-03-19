import { Controller, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

const Schedules = ({ useForm }: any) => {
  const { control, register } = useForm;
  const {
    fields: schedulesFields,
    append: schedulesAppend,
    remove: schedulesRemove
  } = useFieldArray({
    control,
    name: "schedules"
  });

  return (
    <div className="w-fit flex flex-col gap-y-2 md:gap-y-3">
      <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
        모임 일정
      </span>
      <div className="flex items-end gap-x-2 md:gap-x-5">
        <div className="flex flex-col">
          <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
            날짜
          </label>
          <Controller
            name="dateSelect"
            control={useForm.control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                className="w-[136px] md:w-40 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none"
                dateFormat="yyyy년 M월 dd일"
                dateFormatCalendar="yyyy년 MM월"
                shouldCloseOnSelect
                minDate={new Date()}
                selected={value}
                onChange={(data: Date) =>
                  data ? onChange(data) : onChange(new Date())
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
            시작 시간
          </label>
          <Controller
            name="startTimeSelect"
            control={useForm.control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                selected={value}
                onChange={(data: Date) => onChange(new Date(data))}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                minTime={new Date(new Date().setHours(0, 0))}
                maxTime={
                  new Date(
                    new Date(useForm.watch("endTimeSelect")).setMinutes(
                      new Date(useForm.watch("endTimeSelect")).getMinutes() - 15
                    )
                  ) || new Date(new Date().setHours(23, 59))
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
            종료 시간
          </label>
          <Controller
            name="endTimeSelect"
            control={useForm.control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                selected={value}
                onChange={(data: Date) => onChange(new Date(data))}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                minTime={
                  new Date(
                    new Date(useForm.watch("startTimeSelect")).setMinutes(
                      new Date(useForm.watch("startTimeSelect")).getMinutes() +
                        15
                    )
                  ) || new Date(new Date().setHours(0, 0))
                }
                maxTime={new Date(new Date().setHours(23, 59))}
              />
            )}
          />
        </div>
        <button
          className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
          type="button"
          onClick={() => {
            if (
              useForm.getValues("dateSelect") &&
              useForm.getValues("startTimeSelect") &&
              useForm.getValues("endTimeSelect")
            ) {
              schedulesAppend({
                date: `${useForm
                  .getValues("dateSelect")
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}`,
                startTime: `${useForm
                  .getValues("startTimeSelect")
                  .toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}`,
                endTime: `${useForm
                  .getValues("endTimeSelect")
                  .toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}`
              });
            }
          }}
        >
          <FaPlus className="text-white-ffffff text-xl md:text-2xl" />
        </button>
      </div>
      <div className="w-full h-[1px] bg-gray-dddddd"></div>
      <ul className="flex flex-col gap-y-2 md:gap-y-3">
        <span className="absolute text-xs md:text-sm font-medium md:leading-4 text-destructive">
          {useForm.formState.errors.schedules?.message}
        </span>
        {schedulesFields.map((item, index) => {
          return (
            <li key={item.id}>
              <div className="flex items-end gap-x-2 md:gap-x-5">
                <Input
                  className="w-[136px] md:w-40 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                  disabled
                  {...register(`schedules.${index}.date`)}
                />
                <Input
                  className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                  disabled
                  {...register(`schedules.${index}.startTime`)}
                />
                <Input
                  className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                  disabled
                  {...register(`schedules.${index}.endTime`)}
                />
                <button
                  className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                  type="button"
                  onClick={() => schedulesRemove(index)}
                >
                  <FaMinus className="text-white-ffffff text-xl md:text-2xl" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Schedules;
