// en.ts
const messages: Record<string, string> = {
    button_continue: "Continue",

    component_switchDark: "dark",
    component_switchLight: "light",

    continue_signInSuccess: "Sign In Successful",
    continue_continuePrompt: "Taking you automatically to <em>{continueLink}</em>!",
    continue_countdownToContinue: "If nothing happens in {seconds} seconds, click \"Continue\".",

    error_emptyEmail: "Enter an email or phone number",
    error_emptyPassword: "Enter your password",
    error_emptyVerificationCode: "Please enter the verification code from your {device}.",
    error_invalidRedirectLink: "Seems like <em>{continueLink}</em> is not part of KidsLoop! For your safety, we'll take you to <em>{defaultLink}</em>.",

    form_emailLabel: "Email or phone",
    form_passwordLabel: "Password",
    form_verificationLabel: "Verification Code",

    locale_select: "Select Language",
    locale_tooltip: "Change Language",

    login_acceptPrivacyPolicy: "I accept to the Kidsloop Privacy Policy",
    login_createAccount: "Create an account",
    login_forgotPassword: "Forgot Password?",
    login_loginButton: "Sign In",
    login_loginPrompt: "Sign In",

    notFound_notFoundPrompt: "Oops! Broken link.",
    notFound_notFoundDescription: "Let's take you home.",
    notFound_homeButton: "Home",

    signup_signIn: "Sign in instead",
    signup_signUpNextButton: "Next",
    signup_signUpPrompt: "Sign Up",

    verify_backButton: "Go Back",
    verify_verifyButton: "Submit",
    verify_verifyPrompt: "Confirm Account",

    privacy_helpLink: "Help",
    privacy_privacyLink: "Privacy",
    privacy_termsLink: "Terms",

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

    region_comingSoon: "Coming Soon",
    region_cantFind: "Can\'t find your region? Click here."

};
export default messages;
