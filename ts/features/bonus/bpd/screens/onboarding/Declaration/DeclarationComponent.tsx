import { View } from "native-base";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { InfoBox } from "../../../../../../components/box/InfoBox";
import { H1 } from "../../../../../../components/core/typography/H1";
import { IOStyles } from "../../../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../../../components/screens/BaseScreenComponent";
import I18n from "../../../../../../i18n";
import { FooterTwoButtons } from "../../../../bonusVacanze/components/markdown/FooterTwoButtons";
import { Body } from "../../../../../../components/core/typography/Body";
import { Link } from "../../../../../../components/core/typography/Link";
import { DeclarationEntry } from "./DeclarationEntry";

type OwnProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

type PersonalUse = {
  normal: string;
  bold: string;
};

const loadLocales = () => ({
  title: I18n.t("bonus.bpd.title"),
  header: I18n.t("bonus.bpd.onboarding.declaration.header"),
  age: I18n.t("bonus.bpd.onboarding.declaration.conditions.age"),
  resident: I18n.t("bonus.bpd.onboarding.declaration.conditions.resident"),
  personal_use: {
    normal: I18n.t(
      "bonus.bpd.onboarding.declaration.conditions.personal_use.normal"
    ),
    bold: I18n.t(
      "bonus.bpd.onboarding.declaration.conditions.personal_use.bold"
    )
  },
  disclaimer: {
    normal: I18n.t("bonus.bpd.onboarding.declaration.disclaimer.normal"),
    link: I18n.t("bonus.bpd.onboarding.declaration.disclaimer.link")
  }
});

const personalUseText = (personalUse: PersonalUse) => (
  <Body>
    {personalUse.normal}
    <Body>{personalUse.normal}</Body>
  </Body>
);

/**
 * This screen allows the user to declare the required conditions
 */
export const DeclarationComponent: React.FunctionComponent<OwnProps> = props => {
  const {
    title,
    header,
    age,
    resident,
    personal_use,
    disclaimer
  } = loadLocales();

  // tracks the condition accepted, used to enabled the "continue" button
  const [conditionsAccepted, setConditionAccepted] = React.useState(0);

  // transform the required textual conditions to graphical objects with checkbox
  const requiredConditions = [
    age,
    resident,
    personalUseText(personal_use)
  ].map((condition, index) => (
    <DeclarationEntry
      text={condition}
      key={index}
      onValueChange={newValue =>
        newValue
          ? setConditionAccepted(conditionsAccepted + 1)
          : setConditionAccepted(conditionsAccepted - 1)
      }
    />
  ));

  return (
    <BaseScreenComponent goBack={props.onCancel} headerTitle={title}>
      <SafeAreaView style={IOStyles.flex}>
        <ScrollView>
          <View style={IOStyles.horizontalContentPadding}>
            <View spacer={true} large={true} />
            <H1>{header}</H1>
            <View spacer={true} extralarge={true} />
            {requiredConditions}
            <View spacer={true} small={true} />
            <InfoBox>
              <Body>
                {disclaimer.normal}
                <Link>{disclaimer.link}</Link>
              </Body>
            </InfoBox>
          </View>
        </ScrollView>
        <FooterTwoButtons
          rightDisabled={conditionsAccepted !== 3}
          onCancel={props.onCancel}
          onRight={props.onConfirm}
          title={I18n.t("global.buttons.continue")}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
