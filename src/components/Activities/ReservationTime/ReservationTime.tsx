import Button from "@/components/common/Button/Button";

const ReservationTime = () => {
  return (
    <>
      <h2 className="md:font-bold md:text-[20px] lg:pb-3">예약 가능한 시간</h2>
      <div className="md:flex md:flex-wrap md:gap-3 ">
        <Button text="14:00~15:00" size="sm" type="button" />
        <Button text="15:00~16:00" size="sm" type="button" />
      </div>
    </>
  );
};

export default ReservationTime;
