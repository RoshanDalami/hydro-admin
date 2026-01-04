import PageHeader from '@/components/reusable/PageHeader';
import AboutUsView from './components/AboutUsView';
function AboutUsIndex() {
    return (
        <div className='flex flex-col gap-6'>
            <PageHeader title="About Us" description="Welcome back! Here&apos;s an about us page of your platform." />
            <AboutUsView />
        </div>
    )
}

export default AboutUsIndex