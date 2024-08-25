'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { Locale, locales } from '@/translation/config';
import { usePathname, useRouter } from '@/translation/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    defaultValue?: string;
    label?: string;
};

export default function LocaleSwitcherSelect({
    defaultValue = 'en',
    label = 'language selector',
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const t = useTranslations('localeSwitcher');
    const locale = useLocale();

    function onSelectChange(locale: Locale) {
        startTransition(() => {
            router.replace({ pathname: pathname }, { locale });
        });
    }

    return (
        <>
            <Select
                defaultValue={defaultValue}
                disabled={isPending}
                onValueChange={onSelectChange}
                value={locale}
            >
                <SelectTrigger className='w-[200px]'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {locales.map((cur) => (
                        <SelectItem key={cur} value={cur}>
                            {t('locale', { locale: cur })}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}
