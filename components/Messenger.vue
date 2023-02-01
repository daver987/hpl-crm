<script setup lang="ts">
import { Client as ConversationsClient } from '@twilio/conversations'

const conversations1 = [
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: "I'm working on Quasar!",
    time: '15:00',
    sent: true,
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: "I'm working on Quasar!",
    time: '16:00',
    sent: true,
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: "I'm working on Quasar!",
    time: '18:00',
    sent: true,
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: "I'm working on Quasar!",
    time: '17:00',
    sent: true,
  },
]

const $q = useQuasar()
const leftDrawerOpen = ref(false)
const search = ref('')
const sentMessage = ref('')
const message = ref('')
const currentConversationIndex = ref(0)

const name = localStorage.getItem('name') || ''
const loggedIn = name !== ''
const token = ref(null)
const statusString = ref(null)
const conversationsReady = ref(false)
const conversations = ref([])
const selectedConversationSid = ref(null)
const newMessage = ref('')
const conversationsClient = ref(null)

const getToken = () => {
  token.value = '<Your token here>'
  initConversations()
}

const initConversations = async () => {
  conversationsClient.value = await window.ConversationsClient.create(
    token.value
  )
  statusString.value = 'Connecting to Twilio…'

  conversationsClient.value.on('connectionStateChanged', (state: string) => {
    if (state === 'connecting') {
      statusString.value = 'Connecting to Twilio…'
    }
    if (state === 'connected') {
      statusString.value = 'You are connected.'
    }
    if (state === 'disconnecting') {
      statusString.value = 'Disconnecting from Twilio…'
      conversationsReady.value = false
    }
    if (state === 'disconnected') {
      statusString.value = 'Disconnected.'
      conversationsReady.value = false
    }
    if (state === 'denied') {
      statusString.value = 'Failed to connect.'
      conversationsReady.value = false
    }
  })

  conversationsClient.value.on('conversationJoined', (conversation: any) => {
    conversations.value = [...conversations.value, conversation]
  })

  conversationsClient.value.on('conversationLeft', (thisConversation: any) => {
    conversations.value = [
      ...conversations.value.filter((it) => it !== thisConversation),
    ]
  })
}

const logIn = (name: string) => {
  if (name !== '') {
    localStorage.setItem('name', name)
    getToken()
  }
}

const logOut = (event: { preventDefault: () => void } | undefined) => {
  if (event) {
    event.preventDefault()
  }
  localStorage.removeItem('name')
  conversationsClient?.value?.shutdown()
}

onMounted(() => {
  if (loggedIn) {
    getToken()
    statusString.value = 'Fetching credentials…'
  }
})

onUnmounted(() => {
  logOut()
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function setCurrentConversation(index: any) {
  currentConversationIndex.value = index
}

const sendingMessage = ref(false)

const sendMessage = async () => {
  sendingMessage.value = true
  try {
    const { data } = await useFetch('/api/send-message', {
      method: 'POST',
      body: {
        message: sentMessage.value,
        to: '12894009408',
      },
    })
    setTimeout(async () => {
      message.value = sentMessage.value
      $q.notify('Message Sent')
      sentMessage.value = ''
    }, 1500)
  } catch (e) {
    console.error(e)
  } finally {
    sendingMessage.value = false
  }
}

function startConversation() {
  $q.dialog({
    title: 'Start A New Conversation',
    message: 'Enter the Phone Number ',
    prompt: {
      model: '',
      type: 'text',
    },
    cancel: true,
    persistent: true,
  })
    .onOk(async (data: string) => {})
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
}
</script>

<template>
  <div class="position-relative" style="height: 93.5vh">
    <q-layout view="lHh Lpr lFf" container>
      <q-header elevated>
        <q-toolbar>
          <q-btn
            v-if="leftDrawerOpen"
            round
            flat
            icon="keyboard_arrow_left"
            class="q-mr-sm"
            @click="toggleLeftDrawer"
          />
          <q-btn
            v-if="!leftDrawerOpen"
            round
            flat
            icon="keyboard_arrow_right"
            @click="toggleLeftDrawer"
            class="q-mr-sm"
          />

          <q-btn round flat>
            <q-avatar>
              <img :src="currentConversation.avatar" alt="avatar" />
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ currentConversation.person }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar>
          <q-avatar class="cursor-pointer">
            <q-img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" @click="startConversation" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat icon="close" @click="toggleLeftDrawer" />
        </q-toolbar>

        <q-toolbar>
          <q-input
            rounded
            outlined
            dense
            class="full-width"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              clickable
              v-ripple
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar" alt="avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.person }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message
              bg-color="blue-8"
              name="me"
              :text="['hey, how are you?']"
              sent
            />
            <q-chat-message
              v-for="item in initConversation"
              bg-color="grey-4"
              :name="item.author"
              :text="[item.body]"
            />
          </div>
        </div>
      </q-page-container>

      <q-footer>
        <q-toolbar class="row">
          <q-btn round flat outline icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            bg-color="white"
            class="col-grow q-mr-sm"
            v-model="sentMessage"
            placeholder="Type a message"
            input-class="text-grey-8"
          />
          <q-btn @click="sendMessage" round flat icon="send" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>
