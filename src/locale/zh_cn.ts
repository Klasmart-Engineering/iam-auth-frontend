// cn.ts
const messages: Record<string, string> = {
    button_continue: "继续",

    component_switchDark: "深色",
    component_switchLight: "浅色",

    continue_signInSuccess: "登录成功",
    continue_continuePrompt: "自动跳转至",
    continue_countdownToContinue: "如果在{seconds}秒内没有发生任何事情，请点击 \"继续\"",

    error_emptyEmail: "输入邮箱或手机号码",
    error_emptyPassword: "输入密码",
    error_emptyVerificationCode: "输入验证码",
    error_invalidRedirectLink: "似乎<em>{continueLink}</em>不属于KidsLoop! 为了您的安全，我们将为您跳转至<em>{defaultLink}</em>",

    form_emailLabel: "邮箱或手机",
    form_passwordLabel: "密码",
    form_verificationLabel: "验证码",

    locale_select: "选择语言",
    locale_tooltip: "更换语言",

    login_acceptPrivacyPolicy: "我接受Kidsloop隐私条款",
    login_createAccount: "创建账号",
    login_forgotPassword: "忘记密码",
    login_loginButton: "登录",
    login_loginPrompt: "登录",

    notFound_notFoundPrompt: "糟糕！链接中断",
    notFound_notFoundDescription: "跳转至首页",
    notFound_homeButton: "首页",

    signup_signIn: "改为登录",
    signup_signUpNextButton: "下一个",
    signup_signUpPrompt: "注册",

    verify_backButton: "返回",
    verify_verifyButton: "提交",
    verify_verifyPrompt: "确认账号",

    privacy_helpLink: "帮助",
    privacy_privacyLink: "隐私",
    privacy_termsLink: "条款",
    
    selectProfile_title: "Select a profile",
    selectProfile_tooltipBirthday: "Add your birthday",
    selectProfile_tooltipName: "Please update your profile",
    
    birthday_titleUpdate: "Please update your profile.",
    birthday_titleCreate: "What's your learner's birthday?",
    birthday_prompt: "Add a birthday to your account.",
    birthday_promptUpdate: "Add a birthday to {account}.",
    birthday_promptCreate: "We will customize KidsLoop for you and your learner's age. Only you and your learner can see this information.",
    birthday_datePickerHelper: "Month and Year (optional)",
    birthday_buttonSkip: "Skip",
    birthday_buttonSave: "Save",
    birthday_buttonNext: "Next",
    birthday_buttonBack: "Back",

    name_titleUpdate: "Please update your profile.",
    name_titleCreate: "Your learner's name?",
    name_prompt: "Add a {name} to your account.",
    name_promptUpdate: "Add a {name} to {account}.",
    name_promptCreate: "Add your learner's {name} for your learner.",
    name_promptEnd: "You may edit this information at any time.",
    name_name: "name",
    name_username: "username",
    name_fieldGivenName: "Given Name",
    name_fieldFamilyName: "Family Name",
    name_fieldUsername: "Username",
    name_switchName: "Switch to Name",
    name_switchUsername: "Switch to Username",
    name_buttonSave: "Save",
    name_buttonNext: "Next",
    name_buttonBack: "Back",

};

export default messages;