import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ValueMeterDone from "./ValueMeterDone"
import Report from "./Report"
import Image from "next/image"

export default function ValueMeterReport({ data }) {
  // data는 predictions 배열을 포함
  // [{ year, story, value }, ...]
  
  const latestPrediction = data?.[data.length - 1] || {
    year: 2047,
    value: 0,
    story: '측정 실패'
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ValueMeterDone />
      <Report 
        className="mt-4"
        data={data}
        finalValue={latestPrediction.value}
        finalYear={latestPrediction.year}
        finalStory={latestPrediction.story}
      />
    </div>
  )
}
