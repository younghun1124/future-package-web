
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
export default function ValueMeterReport({measureData,imgfile}) {
  return (
            <DialogRoot>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto" >
                    <ValueMeterDone imgfile={imgfile}/>
                  </Button>
                </DialogTrigger>
                <DialogContent  className="w-auto" backgroundColor='#ffffff/0'>
                    <Report measureData={measureData} />
                  {/* <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button>Save</Button>
                  </DialogFooter> */}
                  <DialogCloseTrigger className='text-accent'>
                    X
                </DialogCloseTrigger>
                </DialogContent>
              </DialogRoot>       
       
  )
}
