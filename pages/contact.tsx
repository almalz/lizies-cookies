import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  ContactPageQuery,
  ContactPageDocument,
  ContactpageRecord,
} from '../types/generated/graphql'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { H1, ParagraphXl } from '../components/Typography'
import { useCallback, useState } from 'react'
import { Button } from '../components/Button'
import { ContactFormValues } from './api/contact'

export type ContactPageProps = {
  contactpage: ContactpageRecord
}

const extractObject = (objectsString: string) => {
  return objectsString.split('\n')
}

const ContactPage: NextPage<ContactPageProps> = ({ contactpage }) => {
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>()

  const onSubmit = useCallback(
    async (formValues: any) => {
      setSuccess(false)
      setError(false)

      try {
        const res = await fetch(`/api/contact`, {
          body: JSON.stringify({ contact: formValues }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const data = await res.json()
        if (data) {
          setSuccess(true)
          reset()
        }
      } catch (error) {
        console.error(error)
        setError(true)
      }
    },
    [reset]
  )

  return (
    <Layout
      seo={contactpage?.seo || undefined}
      noIndex={contactpage?.noindex}
      slug="contact"
    >
      <div className="px-12 pb-8 text-purple-700 sm:pb-16 md:px-[15%]">
        <div className="flex flex-col gap-8 pt-8 md:gap-16 md:pt-16">
          <H1 className="">{contactpage.title}</H1>
          <ParagraphXl>{contactpage.header}</ParagraphXl>
        </div>
        <div className="pt-8 sm:pb-4 sm:pt-16 md:px-8 lg:px-[20%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 pb-8 font-body text-pink-500"
          >
            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.firstName}
            >
              <FormLabel htmlFor="firstname" m="0" fontWeight="400">
                {contactpage.firstnameLabel}*
              </FormLabel>
              <Input
                id="firstname"
                {...register('firstName', {
                  required: 'Ce champ est requis',
                })}
                rounded="none"
                borderColor="#F3A1A2"
                border="2px solid"
                focusBorderColor="#f8c7c7"
                _hover={{ borderColor: '#F3A1A2' }}
                _focus={{
                  background: '#F3A1A211',
                }}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.lastName}
            >
              <FormLabel htmlFor="name" m="0" fontWeight="400">
                {contactpage.nameLabel}*
              </FormLabel>
              <Input
                id="name"
                {...register('lastName', {
                  required: 'Ce champ est requis',
                })}
                rounded="none"
                borderColor="#F3A1A2"
                border="2px solid"
                focusBorderColor="#f8c7c7"
                _hover={{ borderColor: '#F3A1A2' }}
                _focus={{
                  background: '#F3A1A211',
                }}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.email}
            >
              <FormLabel htmlFor="email" m="0" fontWeight="400">
                {contactpage.emailLabel}*
              </FormLabel>
              <Input
                id="email"
                {...register('email', {
                  required: 'Ce champ est requis',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                type="email"
                rounded="none"
                borderColor="#F3A1A2"
                border="2px solid"
                focusBorderColor="#f8c7c7"
                _hover={{ borderColor: '#F3A1A2' }}
                _focus={{
                  background: '#F3A1A211',
                }}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.phone}
            >
              <FormLabel htmlFor="phone" m="0" fontWeight="400">
                {contactpage.phoneLabel}*
              </FormLabel>
              <Input
                id="phone"
                {...register('phone', {
                  required: 'Ce champ est requis',
                })}
                rounded="none"
                borderColor="#F3A1A2"
                border="2px solid"
                focusBorderColor="#f8c7c7"
                _hover={{ borderColor: '#F3A1A2' }}
                _focus={{
                  background: '#F3A1A211',
                }}
              />
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.object}
            >
              <FormLabel htmlFor="object" m="0" fontWeight="400">
                {contactpage.objectLabel}*
              </FormLabel>
              {contactpage?.objects && (
                <Select
                  id="object"
                  {...register('object', {
                    required: 'Ce champ est requis',
                  })}
                  rounded="none"
                  borderColor="#F3A1A2"
                  border="2px solid"
                  focusBorderColor="#f8c7c7"
                  _hover={{ borderColor: '#F3A1A2' }}
                  _focus={{
                    background: '#F3A1A211',
                  }}
                >
                  {extractObject(contactpage?.objects).map((object) => {
                    return (
                      <option key={object} value={object}>
                        {object}
                      </option>
                    )
                  })}
                </Select>
              )}
              <FormErrorMessage>
                {errors.object && errors.object.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              className="flex flex-col gap-1"
              isInvalid={!!errors.message}
            >
              <FormLabel htmlFor="message" m="0" fontWeight="400">
                {contactpage.messageLabel}*
              </FormLabel>
              <Textarea
                id="message"
                {...register('message', {
                  required: 'Ce champ est requis',
                })}
                resize="none"
                rounded="none"
                borderColor="#F3A1A2"
                border="2px solid"
                focusBorderColor="#f8c7c7"
                _hover={{ borderColor: '#F3A1A2' }}
                _focus={{
                  background: '#F3A1A211',
                }}
                height="10rem"
              />
              <FormErrorMessage>
                {errors.message && errors.message.message}
              </FormErrorMessage>
            </FormControl>
            <div className="flex flex-col justify-center pt-4">
              <Button loading={isSubmitting} type="submit">
                {contactpage.ctaLabel}
              </Button>
              {success && (
                <span className="pt-2 font-body  text-emerald-400">
                  Message envoyé avec succès
                </span>
              )}
              {error && (
                <span className="pt-2 font-body text-red-500">
                  Erreur serveur : le message n&apos;a pas pu être envoyé
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<ContactPageQuery>({
    query: ContactPageDocument,
  })

  return {
    props: {
      contactpage: data.contactpage,
    },
    revalidate: 60,
  }
}

export default ContactPage
