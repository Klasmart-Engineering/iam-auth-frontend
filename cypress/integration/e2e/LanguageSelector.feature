Feature: Ability to change the language

    As an User
    I would like to change my language from english to other supported languages
    so I can read the translations when I am not a native english speaker

    Scenario Outline: Load translations based on the language selected
    Given I set the locale cookie to '<Language>'
    When I am on the kidsloop login page
    Then the default language selected should be '<Language>'
    Examples:
        | Language |
        | Spanish  |
        | Korean   |
        | Thai     |
        |Vietnamese |
        |Indonesia|
        |Chinese|

    @stage
    Scenario Outline: Language selection should be carried over to hub
        Given I am on the kidsloop login page
        When I select the language selector to "<locale>"
        And I verify the text on "LoginPage" is displayed in "<language>"
        And I enter a valid email "loginautomatioauserwitharg@geqtbdzt.mailosaur.net"
        And I enter password as "Abcd1234"
        And I click on login button
        Then I should see the welcome message "<textMessage>"
        And I sign out
        And I am redirected to the home page
        Examples:
            | locale           | language   | textMessage              |
            | Español          | Spanish    | Biblioteca de contenidos |
            | 한국어           | Korean     | 콘텐츠 라이브러리        |
            | 汉语 (简体)       | Chinese  | 内容资源库                  |
            | Tiếng Việt       | Vietnamese | Thư Viện Nội Dung        |
            | bahasa Indonesia | Indonesia  | Pustaka Konten           |
            | ภาษาไทย          | Thai       | ไลบรารีเนื้อหา           |









