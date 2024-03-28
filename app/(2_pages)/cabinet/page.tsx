import { PersonalInformation } from "@/app/3_widgets/personal-information/ui/PersonalInformation";
import { Suspense } from "react";

export default function personalInformationPage() {

    return (
        <Suspense>
            <PersonalInformation />
        </Suspense>
    );
}
