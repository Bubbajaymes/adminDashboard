import Typography from "antd/es/typography/Typography"

function AppFooter() {
    return <div className="AppFooter">
        <Typography.Link href="tel:+254711111111">
            +254711111111
        </Typography.Link>
        <Typography.Link href="https://www.google.com" target={'_blank'}>
            Privacy Policy
        </Typography.Link>
        <Typography.Link href="https://www.google.com" target={'_blank'}>
            Terms And Conditions
        </Typography.Link>
    </div>
}

export default AppFooter