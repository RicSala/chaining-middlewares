'use client';

import { useLocale } from 'next-intl';

import { Locale } from '@/translation/config';
import { Link, usePathname } from '@/translation/navigation';

export default function PublicNavigationLocaleSwitcher() {
    const locale = useLocale();
    return (
        <div className='flex gap-3 py-5'>
            {locale}
            <LocaleLink locale='es' />
            <LocaleLink locale='en' />
            <LocaleLink locale='it' />
        </div>
    );
}

function LocaleLink({ locale }: { locale: Locale }) {
    const pathname = usePathname();
    const isActive = useLocale() === locale;

    return (
        <Link
            className={isActive ? 'underline' : undefined}
            href={pathname}
            locale={locale}
        >
            {locale.toUpperCase()}
        </Link>
    );
}
