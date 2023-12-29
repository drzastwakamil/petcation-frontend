<template>
  <EHtml>
    <EHead />
    <EPreview>Yelp recent login</EPreview>
    <EBody :style="main">
      <EContainer>
        <ESection :style="content">
          <EContainer
            :style="{
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 35%, rgba(255,198,198,1) 100%)',
            }"
          >
            <EImg
              src="https://petcation.netlify.app/images/logo.svg"
              :style="{
                margin: '25px',
              }"
            />
          </EContainer>
          <ERow
            :style="{
              ...boxInfos,
              paddingBottom: 0,
            }"
          >
            <EColumn>
              <EHeading
                as="h2"
                :style="{
                  paddingTop: '18px',
                  fontSize: '26px',
                  fontWeight: 'bold',
                }"
              >
                Otrzymaliśmy nowy formularz zgłoszeniowy!
              </EHeading>

              <EText :style="paragraph">
                <b>Data wysłania: </b>
                {{ formattedDate }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Email kontaktowy: </b>
                {{ contactEmail }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Telefon kontaktowy: </b>
                {{ phoneNumber }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Treść zgłoszenia: </b>
              </EText>
              <EText :style="paragraph">
                {{ message }}
              </EText>
            </EColumn>
          </ERow>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

<script setup>
import { EBody, EColumn, EContainer, EHead, EHeading, EHtml, EImg, EPreview, ERow, ESection, EText } from 'vue-email';

const props = defineProps({
  date: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  message: {
    type: String,
  },
});

const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeStyle: 'short',
}).format(new Date(props.date));

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: '16px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const boxInfos = {
  padding: '20px 40px',
};
</script>
