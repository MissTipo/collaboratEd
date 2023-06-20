import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from './image.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function Faq() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg" >
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
              <Accordion.Item className={classes.item} value="Introduction">
                <Accordion.Control>
                  What is CollaboratEd?
                </Accordion.Control>
                <Accordion.Panel>
                  CollaboratEd is an innovative web-based platform designed to facilitate computer-supported collaborative learning through peer-to-peer mentorship and learning. 
                  It empowers students to connect, learn, and grow together in a user-friendly and intuitive environment.
                </Accordion.Panel>
              </Accordion.Item>
              
              <Accordion.Item className={classes.item} value="second">
                <Accordion.Control>
                  How can CollaboratEd benefit students?
                </Accordion.Control>
                <Accordion.Panel>
                  CollaboratEd aims to transform the traditional learning experience by harnessing the power of technology and collaborative learning methodologies. 
                  It empowers students to thrive academically, cultivate meaningful connections, and create a vibrant learning community.
                </Accordion.Panel>
              </Accordion.Item>
              
              <Accordion.Item className={classes.item} value="third">
                <Accordion.Control>
                  What features are available on CollaboratEd?
                </Accordion.Control>
                <Accordion.Panel>
                  CollaboratEd offers a range of features including user profiles, discussion forums, private messaging, collaborative project spaces, resource sharing, and virtual classrooms. 
                  These features are designed to facilitate effective communication, collaboration, and knowledge sharing among students.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="fourth">
                <Accordion.Control>
                  Is CollaboratEd suitable for all grade levels?
                </Accordion.Control>
                <Accordion.Panel>
                Yes, CollaboratEd is designed to cater to students of all grade levels, from beginner to experienced levels. 
                The platform provides a safe and inclusive space for students to interact and learn from one another, regardless of their academic level.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>How can I reset my password?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Can I create more that one account?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="free">
                <Accordion.Control>Is CollaboratEd free to use?</Accordion.Control>
                <Accordion.Panel>
                  CollaboratEd offers both free and premium membership options. 
                  The free version provides access to essential features, while the premium membership unlocks additional benefits and exclusive features. 
                  Detailed pricing information can be found on our website.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="safe">
                <Accordion.Control>Is CollaboratEd safe and secure?</Accordion.Control>
                <Accordion.Panel>
                  Yes, user safety and security are a top priority for CollaboratEd. 
                  We employ robust security measures to protect user data and ensure a safe online environment. 
                  We also have moderation systems in place to maintain a positive and respectful community atmosphere.
                </Accordion.Panel>
              </Accordion.Item>

            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}