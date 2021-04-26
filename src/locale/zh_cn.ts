// cn.ts
const messages: Record<string, string> = {
    button_continue: "继续",

    component_switchDark: "深色",
    component_switchLight: "浅色",

    continue_signInSuccess: "登录成功",
    continue_continuePrompt: "自动跳转至<em>{continueLink}</em>",
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

    selectProfile_title: "选择一个档案",
    selectProfile_tooltipBirthday: "添加生日",
    selectProfile_tooltipName: "请更新你的资料",

    birthday_titleUpdate: "请更新你的资料",
    birthday_titleCreate: "你学生的生日是什么时候",
    birthday_prompt: "给你的账号添加生日",
    birthday_promptUpdate: "给{account}添加账号",
    birthday_promptCreate: "我们将根据你和你学生的年龄定制KidsLoop，只有你和你的学生可以看到这些信息。",
    birthday_datePickerHelper: "年月（选填）",
    birthday_buttonSkip: "跳过",
    birthday_buttonSave: "保存",
    birthday_buttonNext: "下一个",
    birthday_buttonBack: "返回",

    name_titleUpdate: "请更新你的资料",
    name_titleCreate: "学生姓名",
    name_prompt: "为你的账号添加 {name}",
    name_promptUpdate: "为 {name} 账号添加 {account}",
    name_promptCreate: "给你的学生添加学生 {name}",
    name_promptEnd: "你可以在任何时候编辑此信息",
    name_name: "姓名",
    name_username: "用户名",
    name_fieldGivenName: "名",
    name_fieldFamilyName: "姓",
    name_fieldUsername: "用户名",
    name_switchName: "切换为姓名",
    name_switchUsername: "切换为用户名",
    name_buttonSave: "保存",
    name_buttonNext: "下一个",
    name_buttonBack: "返回",

    region_cantFind: "找不到你的国家或地区？请点击这里",
    region_comingSoon: "即将推出",
    region_selectCountryRegion: "请选择你的国家或地区",

    selectProfile_noOrgTitle: "您尚未加入任何一个组织",
    selectProfile_noOrgSubtitle: "请加入一个组织，以使用KidsLoop",
};
export default messages;