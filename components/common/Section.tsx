import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import clsx from "clsx";

interface SectionProps {
    title ?: string;
    description ?: string;
    children : React.ReactNode;
    size ?: 'small'|'medium'|'large';
}
const Section = ({title = "Title", description, children, size = "medium"} : SectionProps) => {
    const closeSection = () => {

    }

    return ( 
        <Card className={clsx(size == 'small' ? 'w-[240px]':'w-[400px]', 'h-[350px] border-none')}>
            <CardHeader className="pb-2">
                <CardTitle className="text-algoMarron dark:text-algoOrange">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-[60vh] p-1">
                {/* <ScrollArea className="w-full"> */}
                    {children}
                {/* </ScrollArea> */}
            </CardContent>
        </Card>
     );
}
 
export default Section;