<template>
  <v-container class="fill-height">
    <!-- Chat Interface -->
    <div class="chat-container">
      <!-- Chat Window -->
      <v-card
          v-if="chatOpen"
          :class="['chat-window', { minimized: chatMinimized }]"
          elevation="12"
          rounded="lg"
      >
        <!-- Minimized Chat -->
        <div
            v-if="chatMinimized"
            class="minimized-chat"
            @click="chatMinimized = false"
        >
          <div class="minimized-content">
            <div class="minimized-info">
              <div class="minimized-name">PPA Virtual Office</div>
              <div class="minimized-preview">
                {{ getLastMessagePreview() }}
              </div>
            </div>

            <div class="minimized-avatar-container">
              <v-badge
                  v-if="unreadCount > 0"
                  :content="unreadCount"
                  color="error"
                  location="top right"
                  offset-x="-8"
                  offset-y="-8"
              >
                <v-avatar size="40" color="success">
                  <v-icon color="white" size="18">mdi-robot</v-icon>
                </v-avatar>
              </v-badge>
              <v-avatar v-else size="40" color="success">
                <v-icon color="white" size="18">mdi-robot</v-icon>
              </v-avatar>
            </div>
          </div>

          <!-- Close button -->
          <v-btn
              icon
              size="small"
              variant="text"
              @click.stop="closeChat"
              class="minimized-close"
          >
            <v-icon size="16" color="white">mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Full Chat -->
        <template v-else>
          <!-- Header -->
          <div class="chat-header">
            <div class="header-content">
              <v-avatar size="36" color="success" class="mr-3">
                <v-icon color="white" size="18">mdi-robot</v-icon>
              </v-avatar>

              <div class="header-info">
                <div class="bot-name">PPA Virtual Office</div>
                <div class="bot-status">
                  <div class="status-indicator"></div>
                  {{ currentStatus }}
                </div>
              </div>
            </div>

            <div class="header-actions">
              <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="chatMinimized = true"
                  class="header-btn"
              >
                <v-icon size="18" color="white">mdi-minus</v-icon>
              </v-btn>
              <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="closeChat"
                  class="header-btn"
              >
                <v-icon size="18" color="white">mdi-close</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="chat-messages">
            <div
                class="messages-scroll"
                ref="messageScroll"
                @scroll.passive="onChatScroll"
            >
              <div
                  v-for="(message, index) in messages"
                  :key="`msg-${message.id}`"
                  class="message-block"
              >
                <!-- Date separator -->
                <div
                    v-if="shouldShowDateSeparator(messages, index)"
                    class="date-separator"
                >
                  {{ formatDateSimple(message.timestamp) }}
                </div>

                <!-- Bot Message -->
                <div v-if="!message.isSent" class="bot-message-container">
                  <div class="bot-message-header">
                    <v-avatar size="24" color="success">
                      <v-icon color="white" size="12">mdi-robot</v-icon>
                    </v-avatar>
                    <span class="bot-label">PPA Assistant</span>
                  </div>

                  <div class="bot-message-content">
                    <!-- Text content -->
                    <div v-if="message.text" v-html="message.text" class="message-text"></div>

                    <!-- Options buttons -->
                    <div v-if="message.options" class="message-options">
                      <v-btn
                          v-for="option in message.options"
                          :key="option.value"
                          @click="selectOption(option)"
                          variant="outlined"
                          color="success"
                          class="option-btn"
                          rounded="xl"
                      >
                        <span v-if="option.icon" class="option-icon">{{ option.icon }}</span>
                        {{ option.label }}
                      </v-btn>
                    </div>

                    <!-- Directors Grid -->
                    <div v-if="message.showDirectors" class="directors-section">
                      <div class="directors-intro">
                        Great! Please choose the director you'd like to connect with:
                      </div>
                      <div class="directors-grid">
                        <div
                            v-for="director in directors"
                            :key="director.id"
                            class="director-card"
                            @click="selectDirector(director)"
                        >
                          <v-avatar size="60" class="director-avatar">
                            <v-img :src="director.avatar"/>
                          </v-avatar>
                          <div class="director-info">
                            <div class="director-name">{{ director.name }}</div>
                            <div class="director-role">Director</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Director Office Info -->
                    <div v-if="message.showDirectorOffice" class="director-office-info">
                      <div class="office-header">
                        <strong>{{ selectedDirector?.name }}'s Office</strong>
                      </div>
                      <div class="office-actions">
                        📌 You can:
                        <ul>
                          <li>View qualifications</li>
                          <li>Select services</li>
                          <li>Send your request directly</li>
                        </ul>
                        Would you like to submit a service request now?
                      </div>
                      <div class="office-options">
                        <v-btn
                            @click="selectOption({label: 'Yes, submit request', value: 'submit_request'})"
                            variant="outlined"
                            color="success"
                            class="option-btn"
                            rounded="xl"
                        >
                          ✅ Yes, submit request
                        </v-btn>
                        <v-btn
                            @click="selectOption({label: 'Not now', value: 'not_now'})"
                            variant="outlined"
                            color="success"
                            class="option-btn"
                            rounded="xl"
                        >
                          ❌ Not now
                        </v-btn>
                      </div>
                    </div>

                    <!-- Service Form -->
                    <v-form
                        v-if="message.showForm"
                        ref="serviceForm"
                        v-model="formValid"
                        class="chat-form"
                        @submit.prevent="submitServiceRequest"
                    >
                      <div class="form-intro">
                        Please share your details:
                      </div>

                      <v-text-field
                          v-model="serviceRequest.fullName"
                          label="Full Name *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          class="form-field"
                          hint="Contact details must be by owner, not third party"
                      />

                      <v-text-field
                          v-model="serviceRequest.email"
                          label="Email *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.email]"
                          class="form-field"
                      />

                      <v-text-field
                          v-model="serviceRequest.phone"
                          label="Phone *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.phone]"
                          class="form-field"
                      />

                      <v-text-field
                          v-model="serviceRequest.nic"
                          label="NIC Number *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.nic]"
                          class="form-field"
                          persistent-hint
                          :hint="getNICFormatHint(serviceRequest.nic)"
                      />

                      <!-- Services Loading State -->
                      <v-alert
                          v-if="servicesLoading"
                          type="info"
                          variant="tonal"
                          class="form-field"
                          density="compact"
                      >
                        <div class="d-flex align-center">
                          <v-progress-circular size="16" indeterminate class="mr-2"/>
                          <span class="text-caption">Loading services...</span>
                        </div>
                      </v-alert>

                      <!-- Services Error State -->
                      <v-alert
                          v-else-if="servicesError"
                          type="error"
                          variant="tonal"
                          class="form-field"
                          density="compact"
                      >
                        <div class="d-flex align-center justify-space-between">
                          <span class="text-caption">{{ servicesError }}</span>
                          <v-btn
                              color="error"
                              variant="text"
                              size="x-small"
                              @click="loadServices"
                              :loading="servicesLoading"
                              prepend-icon="mdi-refresh"
                          >
                            Retry
                          </v-btn>
                        </div>
                      </v-alert>

                      <!-- Main Service Category Dropdown -->
                      <v-select
                          v-else
                          v-model="serviceRequest.serviceCategory"
                          :items="mainServiceCategories"
                          item-title="name"
                          item-value="id"
                          label="Service Category *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.requiredSelect]"
                          class="form-field"
                          hint="Select the main service category"
                          clearable
                          :disabled="servicesLoading"
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item v-bind="props" :title="null">
                            <template v-slot:prepend>
                              <v-icon :icon="item.raw.icon" class="mr-3" size="small" color="success"/>
                            </template>
                            <v-list-item-title class="font-weight-medium">
                              {{ item.raw.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-caption">
                              {{ item.raw.description }}
                            </v-list-item-subtitle>
                          </v-list-item>
                        </template>

                        <template v-slot:selection="{ item }">
                          <div class="d-flex align-center">
                            <v-icon :icon="item.raw.icon" class="mr-2" size="small" color="success"/>
                            <span>{{ item.raw.name }}</span>
                          </div>
                        </template>

                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title class="text-center py-2 text-caption">
                              {{ servicesLoading ? 'Loading...' : 'No categories available' }}
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>

                      <!-- Service Subcategory Dropdown -->
                      <v-select
                          v-model="serviceRequest.serviceSubcategory"
                          :items="availableSubcategories"
                          item-title="name"
                          item-value="id"
                          label="Specific Service Type *"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.requiredSelect]"
                          class="form-field"
                          :hint="!serviceRequest.serviceCategory ? 'Please select a category first' : 'Choose the specific service type'"
                          persistent-hint
                          clearable
                          :disabled="!serviceRequest.serviceCategory || servicesLoading"
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item v-bind="props" :title="null">
                            <template v-slot:prepend>
                              <v-icon :icon="item.raw.icon" class="mr-3" size="small" color="success"/>
                            </template>
                            <v-list-item-title class="font-weight-medium">
                              {{ item.raw.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-caption">
                              {{ item.raw.description }}
                            </v-list-item-subtitle>
                          </v-list-item>
                        </template>

                        <template v-slot:selection="{ item }">
                          <div class="d-flex align-center">
                            <v-icon :icon="item.raw.icon" class="mr-2" size="small" color="success"/>
                            <span>{{ item.raw.name }}</span>
                          </div>
                        </template>

                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title class="text-center py-2 text-caption">
                              {{
                                !serviceRequest.serviceCategory
                                    ? 'Select a category first'
                                    : (servicesLoading ? 'Loading...' : 'No services available')
                              }}
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>

                      <v-textarea
                          v-model="serviceRequest.message"
                          label="The Problem or Need"
                          placeholder="What? Why? When? Where? Who? How?"
                          variant="outlined"
                          density="compact"
                          rows="4"
                          class="form-field"
                          :rules="[rules.required]"
                          hint="Describe your specific problem or need in detail"
                      />

                      <v-btn
                          type="submit"
                          color="success"
                          :disabled="!formValid || servicesLoading"
                          :loading="formLoading"
                          class="submit-btn"
                          rounded="xl"
                          block
                      >
                        Submit Request
                      </v-btn>

                      <div class="form-note">
                        <small>* Request will be auto-sent to director's email + copy to you</small>
                      </div>
                    </v-form>

                    <!-- Lead Form -->
                    <v-form
                        v-if="message.showLeadForm"
                        ref="leadForm"
                        v-model="leadFormValid"
                        class="chat-form lead-form"
                    >
                      <div class="lead-intro">
                        Would you like us to keep you updated on PPA's news, projects, and funding opportunities?
                      </div>
                      <v-text-field
                          v-model="leadInfo.name"
                          label="Your Name"
                          variant="outlined"
                          density="compact"
                          class="form-field"
                      />
                      <v-text-field
                          v-model="leadInfo.email"
                          label="Email"
                          variant="outlined"
                          density="compact"
                          :rules="leadInfo.email ? [rules.email] : []"
                          class="form-field"
                      />
                      <v-text-field
                          v-model="leadInfo.phone"
                          label="Phone"
                          variant="outlined"
                          density="compact"
                          class="form-field"
                      />
                      <v-select
                          v-model="leadInfo.interest"
                          :items="interestCategories"
                          label="Category Interest"
                          variant="outlined"
                          density="compact"
                          class="form-field"
                      />
                      <div class="lead-actions">
                        <v-btn
                            @click="submitLead(true)"
                            color="success"
                            :loading="leadLoading"
                            class="lead-btn"
                            rounded="xl"
                        >
                          👍 Yes, subscribe me
                        </v-btn>
                        <v-btn
                            @click="submitLead(false)"
                            variant="outlined"
                            color="success"
                            class="lead-btn"
                            rounded="xl"
                        >
                          👎 No, thanks
                        </v-btn>
                      </div>
                    </v-form>

                    <!-- Quick Links -->
                    <div v-if="message.quickActions" class="quick-links-section">
                      <div class="quick-links-title">Quick Links:</div>
                      <div class="quick-links-grid">
                        <v-btn
                            v-for="action in quickActionsList"
                            :key="action.value"
                            @click="handleQuickAction(action)"
                            variant="outlined"
                            color="success"
                            class="quick-link-btn"
                            rounded="xl"
                            size="small"
                        >
                          {{ action.label }}
                        </v-btn>
                      </div>
                    </div>
                  </div>

                  <div class="message-time">
                    {{ formatTimeSimple(message.timestamp) }}
                  </div>
                </div>

                <!-- User Message -->
                <div v-else class="user-message-container">
                  <div class="user-message-bubble">
                    {{ message.text }}
                  </div>
                  <div class="user-message-time">
                    {{ formatTimeSimple(message.timestamp) }}
                    <v-icon
                        size="12"
                        class="ml-1"
                        :color="message.isRead ? 'success' : '#8A8A8A'"
                    >
                      {{ message.isRead ? "mdi-check-all" : "mdi-check" }}
                    </v-icon>
                  </div>
                </div>
              </div>

              <!-- Typing indicator -->
              <div v-if="isTyping" class="bot-message-container">
                <div class="bot-message-header">
                  <v-avatar size="24" color="success">
                    <v-icon color="white" size="12">mdi-robot</v-icon>
                  </v-avatar>
                  <span class="bot-label">PPA Assistant</span>
                </div>
                <div class="typing-bubble">
                  <div class="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="chat-input-area">
            <div class="input-container">
              <input
                  v-model="userMessage"
                  placeholder="Reply to PPA Assistant..."
                  class="message-input"
                  @keyup.enter="sendUserMessage"
                  @focus="markAsRead"
              />
              <v-btn
                  icon
                  size="small"
                  @click="sendUserMessage"
                  :disabled="!userMessage.trim()"
                  class="send-btn"
              >
                <v-icon size="18" color="success">mdi-send</v-icon>
              </v-btn>
            </div>
          </div>
        </template>
      </v-card>

      <!-- FAB Button -->
      <v-badge
          v-if="!chatOpen"
          :content="unreadCount"
          color="error"
          :model-value="unreadCount > 0"
          offset-x="-8"
          offset-y="-8"
          location="top right"
      >
        <v-btn
            class="chat-fab"
            color="success"
            size="x-large"
            icon
            elevation="8"
            @click="openChat"
        >
          <v-icon size="28" color="white">mdi-robot</v-icon>
        </v-btn>
      </v-badge>

      <!-- Help Message Bubble -->
      <div
          v-if="!chatOpen && showHelpMessage"
          class="help-message-bubble"
          @click="openChatFromHelp"
      >
        <div class="help-message-text">How can I help you?</div>
        <div class="help-message-arrow"></div>
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
        location="top"
    >
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import {ref, computed, nextTick, onMounted, watch} from "vue";
import type {Director as ComposableDirector} from '~/composables/useDirectors';

const {
  mainServiceCategories,
  loading: servicesLoading,
  error: servicesError,
  fetchServiceCategories,
  getSubcategoriesForCategory,
  getCategoryName,
  getSubcategoryName,
  getCategoryIcon
} = useServices()

console.log('useServices initialized:', {
  mainServiceCategories: mainServiceCategories.value,
  servicesLoading: servicesLoading.value,
  servicesError: servicesError.value
})

// Types
interface Message {
  id: string;
  text?: string;
  isSent: boolean;
  timestamp: Date;
  isRead: boolean;
  options?: Array<{ label: string; value: string; icon?: string }>;
  showDirectors?: boolean;
  showDirectorOffice?: boolean;
  showForm?: boolean;
  showLeadForm?: boolean;
  quickActions?: boolean;
}

interface Director {
  id: string;
  name: string;
  avatar: string;
  email: string;
  qualifications: string[];
  services: string[];
}

// Composables
const {getAllDirectors} = useDirectors();

// State
const chatOpen = ref(false);
const chatMinimized = ref(false);
const isTyping = ref(false);
const messages = ref<Message[]>([]);
const unreadCount = ref(0);
const userMessage = ref("");
const currentStatus = ref("Online - Your Virtual Receptionist");
const selectedDirector = ref<Director | null>(null);
const currentStage = ref("greeting");
const formLoading = ref(false);
const leadLoading = ref(false);
const showHelpMessage = ref(false);

// Forms
const formValid = ref(false);
const leadFormValid = ref(true);

// Updated service request form 
const serviceRequest = ref({
  fullName: "",
  email: "",
  phone: "",
  nic: "",
  serviceCategory: null as number | null,  
  serviceSubcategory: null as number | null,
  message: "",
});

const leadInfo = ref({
  name: "",
  email: "",
  phone: "",
  interest: "",
});

// Transform directors from composable to chatbot format
const directors = computed<Director[]>(() => {
  const composableDirectors = getAllDirectors();
  return composableDirectors.map((director: ComposableDirector) => ({
    id: director.id.toString(),
    name: director.name,
    avatar: director.image,
    email: director.email,
    qualifications: director.qualifications,
    services: director.services.map(service => service.name)
  }));
});

// Computed property for available subcategories based on selected category
const availableSubcategories = computed(() => {
  return getSubcategoriesForCategory(serviceRequest.value.serviceCategory)
})

const interestCategories = [
  "Plantation Support",
  "HRM Reform",
  "Investments",
  "Exports",
  "Sustainable Agriculture",
  "Funding Opportunities",
];

const quickActionsList = [
  {label: "Funding Calendar", value: "funding"},
  {label: "Plantation Reform Act", value: "reform"},
  {label: "HRM Ministry Proposal", value: "hrm"},
  {label: "Avocado Project", value: "avocado"},
  {label: "Zengate Trade Platform", value: "zengate"},
];

// Watch for service category changes and resets
watch(() => serviceRequest.value.serviceCategory, (newCategoryId) => {
  // Clear subcategory when category changes
  serviceRequest.value.serviceSubcategory = null
})

// NIC validation function
const validateNIC = (nic: string): boolean => {
  if (!nic) return false;

  // Remove spaces and convert to uppercase
  nic = nic.replace(/\s/g, '').toUpperCase();

  // Old NIC format: 9 digits + V/X
  const oldNICPattern = /^[0-9]{9}[VX]$/;
  // New NIC format: 12 digits
  const newNICPattern = /^[0-9]{12}$/;

  if (oldNICPattern.test(nic)) {
    return validateOldNIC(nic);
  }

  if (newNICPattern.test(nic)) {
    return validateNewNIC(nic);
  }

  return false;
};

// Validate old format NIC (9 digits + V/X)
const validateOldNIC = (nic: string): boolean => {
  const year = parseInt(nic.substring(0, 2));
  const dayOfYear = parseInt(nic.substring(2, 5));

  // Basic range checks for day of year
  if (dayOfYear < 1 || dayOfYear > 866) return false; // 866 for leap years with gender offset

  return true;
};

// Validate new format NIC (12 digits)
const validateNewNIC = (nic: string): boolean => {
  const year = parseInt(nic.substring(0, 4));
  const dayOfYear = parseInt(nic.substring(4, 7));
  const serialNumber = nic.substring(7, 12);

  // Validate year
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) return false;

  // Validate day of year considering gender offset
  const actualDayOfYear = dayOfYear > 500 ? dayOfYear - 500 : dayOfYear;
  
  // Check if day is valid for the year
  if (actualDayOfYear < 1) return false;
  
  // Check maximum days in year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const maxDays = isLeapYear ? 366 : 365;
  
  if (actualDayOfYear > maxDays) return false;

  // Validate serial number (should be 5 digits)
  if (!/^[0-9]{5}$/.test(serialNumber)) return false;

  // Day of year should not be 0
  if (actualDayOfYear === 0) return false;
  
  // For February 29th, ensure it's a leap year
  if (actualDayOfYear === 60 && !isLeapYear) return false; // Feb 29 is day 60

  return true;
};

// Get NIC format hint based on what user has typed
const getNICFormatHint = (nic: string): string => {
  if (!nic) return "Enter old format or new format";
  
  const cleanNIC = nic.replace(/\s/g, '').toUpperCase();
  
  if (cleanNIC.length <= 10) {
    return "Old format: YYMMMNNNC (e.g., 921234567V)";
  } else if (cleanNIC.length <= 12) {
    if (/^[0-9]+$/.test(cleanNIC)) {
      const year = cleanNIC.substring(0, 4);
      const dayOfYear = cleanNIC.substring(4, 7);
      
      if (cleanNIC.length >= 4) {
        const yearNum = parseInt(year);
        const currentYear = new Date().getFullYear();
        
        if (yearNum < 1900 || yearNum > currentYear) {
          return `Invalid birth year: ${year}`;
        }
      }
      
      if (cleanNIC.length >= 7) {
        const dayNum = parseInt(dayOfYear);
        const actualDay = dayNum > 500 ? dayNum - 500 : dayNum;
        const gender = dayNum > 500 ? "Female" : "Male";
        
        if (actualDay < 1 || actualDay > 366) {
          return `Invalid day of year: ${dayOfYear}`;
        }
        
        return `New format detected - Year: ${year}, Day: ${actualDay} (${gender})`;
      }
      
      return "New format: YYYYMMMNNNNN (e.g., 200012345678)";
    }
    return "New format should contain only digits";
  }
  
  return "Invalid format - too long";
};

// Validation rules - updated with enhanced NIC validation
const rules = {
  required: (v: any) => !!v || "This field is required",
  requiredSelect: (v: any) => (v !== null && v !== undefined) || "Please select an option",
  email: (v: string) => !v || /.+@.+\..+/.test(v) || "Invalid email format",
  phone: (v: string) => !v || /^(\+94|0)?[0-9]{9,10}$/.test(v) || "Invalid phone number format",
  nic: (v: string) => {
    if (!v) return "NIC is required";
    
    const validation = validateNIC(v);
    if (!validation) {
      const cleanNIC = v.replace(/\s/g, '').toUpperCase();
      
      // Provide specific error messages based on format
      if (!/^[0-9]{9}[VX]$/.test(cleanNIC) && !/^[0-9]{12}$/.test(cleanNIC)) {
        return "Enter valid format: Old (123456789V) or New (200012345678)";
      }
      
      if (/^[0-9]{12}$/.test(cleanNIC)) {
        const year = parseInt(cleanNIC.substring(0, 4));
        const dayOfYear = parseInt(cleanNIC.substring(4, 7));
        
        if (year < 1900 || year > new Date().getFullYear()) {
          return `Invalid birth year: ${year}`;
        }
        
        const actualDay = dayOfYear > 500 ? dayOfYear - 500 : dayOfYear;
        if (actualDay < 1 || actualDay > 366) {
          return `Invalid day of year: ${dayOfYear}`;
        }
      }
      
      return "Invalid NIC number - please check and try again";
    }
    
    return true;
  },
};

// Refs
const messageScroll = ref<HTMLElement | null>(null);
const snackbar = ref({show: false, text: "", color: "success"});

// Formatting helpers
const formatTimeSimple = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDateSimple = (date: Date): string => {
  return date.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const shouldShowDateSeparator = (messages: Message[], index: number): boolean => {
  if (index === 0) return true;
  const curr = new Date(messages[index].timestamp).toDateString();
  const prev = new Date(messages[index - 1].timestamp).toDateString();
  return curr !== prev;
};

// Load services when component mounts with better error handling
const loadServices = async () => {
  try {
    console.log('Loading services...')
    await fetchServiceCategories()
    console.log('Services loaded:', mainServiceCategories.value.length, 'categories')
  } catch (error) {
    console.error('Failed to load services:', error)
    // You can add a notification here if needed
    showNotification('Failed to load services. Please check your connection.', 'error')
  }
}

// Chat functions
const openChat = () => {
  chatOpen.value = true;
  unreadCount.value = 0;
  showHelpMessage.value = false;
  if (messages.value.length === 0) {
    initializeChat();
  }
  nextTick(() => scrollToBottom());
};

const openChatFromHelp = () => {
  showHelpMessage.value = false;
  openChat();
};

const closeChat = () => {
  chatOpen.value = false;
  chatMinimized.value = false;
  // Show help message again after closing chat
  setTimeout(() => {
    if (!chatOpen.value) {
      showHelpMessage.value = true;
      setTimeout(() => {
        showHelpMessage.value = false;
      }, 3000);
    }
  }, 2000);
};

const initializeChat = () => {
  // Check for returning user
  const userName = localStorage.getItem("ppa_user_name");
  if (userName) {
    currentStatus.value = `Welcome back, ${userName}!`;
    addBotMessage(
        `Hello ${userName}, welcome back to the <strong>PPA Virtual Office</strong>!<br><br>` +
        `How can I assist you today?`,
        {
          options: [
            {label: "Connect with a Director", value: "director", icon: "1️⃣"},
            {label: "Explore Services & Projects", value: "services", icon: "2️⃣"},
            {label: "Partnership / Investment Inquiry", value: "partnership", icon: "3️⃣"},
            {label: "General Information", value: "info", icon: "4️⃣"},
          ],
        }
    );
  } else {
    // First-time user greeting
    addBotMessage(
        `Welcome to the <strong>Proprietary Planters Alliance (PPA) Virtual Office</strong> -- Sri Lanka's first digital hub for Proprietary Planters.<br><br>I'm your assistant. May I know what brings you here today?`,
        {
          options: [
            {label: "Connect with a Director", value: "director", icon: "1️⃣"},
            {label: "Explore Services & Projects", value: "services", icon: "2️⃣"},
            {label: "Partnership / Investment Inquiry", value: "partnership", icon: "3️⃣"},
            {label: "General Information", value: "info", icon: "4️⃣"},
          ],
        }
    );
  }
};

const addBotMessage = (text: string, extras: Partial<Message> = {}) => {
  isTyping.value = true;

  setTimeout(() => {
    const message: Message = {
      id: `bot-${Date.now()}`,
      text,
      isSent: false,
      timestamp: new Date(),
      isRead: false,
      ...extras,
    };

    messages.value.push(message);
    isTyping.value = false;

    if (!chatOpen.value || chatMinimized.value) {
      unreadCount.value++;
    }

    nextTick(() => scrollToBottom());
  }, 1200);
};

const addUserMessage = (text: string) => {
  const message: Message = {
    id: `user-${Date.now()}`,
    text,
    isSent: true,
    timestamp: new Date(),
    isRead: true,
  };

  messages.value.push(message);
  nextTick(() => scrollToBottom());
};

const selectOption = (option: { label: string; value: string; icon?: string }) => {
  addUserMessage(option.label);

  setTimeout(() => {
    switch (option.value) {
      case "director":
        showDirectors();
        break;
      case "services":
        showServices();
        break;
      case "partnership":
        showPartnership();
        break;
      case "info":
        showGeneralInfo();
        break;
      case "submit_request":
        showServiceForm();
        break;
      case "not_now":
        askForLeadCapture();
        break;
    }
  }, 500);
};

const showDirectors = () => {
  currentStage.value = "directors";
  addBotMessage("", {
    showDirectors: true,
  });
};

const selectDirector = (director: Director) => {
  selectedDirector.value = director;
  addUserMessage(director.name);

  setTimeout(() => {
    addBotMessage(
        `Opening <strong>${director.name}'s Office</strong>...<br><br>` +
        "You'll be redirected to their detailed profile page where you can:<br>" +
        "• View full qualifications and expertise<br>" +
        "• See all services offered and specializations<br>" +
        "• Submit service requests directly<br>" +
        "• Get direct contact information<br><br>" +
        "Redirecting now..."
    );

    // Navigate to director profile page
    setTimeout(() => {
      navigateTo(`/director/${director.id}`);
    }, 1500);
  }, 500);
};

const showServiceForm = () => {
  currentStage.value = "service_request";
  addBotMessage("", {showForm: true});
};

const submitServiceRequest = async () => {
  if (!formValid.value) return;

  formLoading.value = true;
  isTyping.value = true;

  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.backendUrl

    const requestPayload = {
      full_name: serviceRequest.value.fullName,
      email: serviceRequest.value.email,
      phone: serviceRequest.value.phone,
      nic: serviceRequest.value.nic,
      service_category_id: serviceRequest.value.serviceCategory,
      service_subcategory_id: serviceRequest.value.serviceSubcategory,
      message: serviceRequest.value.message
    }

    console.log('Submitting service request:', requestPayload)

    const response = await $fetch(`${baseURL}/chatbot-service/submit`, {
      method: 'POST',
      body: requestPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Service request response:', response)

    // Get the readable service names for display
    const categoryName = getCategoryName(serviceRequest.value.serviceCategory)
    const subcategoryName = getSubcategoryName(serviceRequest.value.serviceSubcategory)

    formLoading.value = false;
    isTyping.value = false;

    // Store user name for personalization
    localStorage.setItem("ppa_user_name", serviceRequest.value.fullName);

    // Success message with request ID
    addBotMessage(
        `✅ Thank you, <strong>${serviceRequest.value.fullName}</strong>.<br><br>` +
        `Your request for <strong>${subcategoryName}</strong> (${categoryName}) has been submitted successfully.<br>` +
        `📧 Request ID: <strong>#${response.request_id}</strong><br>` +
        `📧 A confirmation email will be sent to you shortly.<br>` +
        `You'll hear back from our team soon.`,
        {quickActions: true}
    );

    // Reset form
    serviceRequest.value = {
      fullName: "",
      email: "",
      phone: "",
      nic: "",
      serviceCategory: null,
      serviceSubcategory: null,
      message: "",
    };

    showNotification(`Service request submitted successfully! Request ID: #${response.request_id}`, "success");

  } catch (error: any) {
    formLoading.value = false;
    isTyping.value = false;

    console.error('Service request submission error:', error)

    // Handle different types of errors from backend
    let errorMessage = "Sorry, there was an error submitting your request. Please try again.";

    if (error.data?.detail) {
      if (Array.isArray(error.data.detail)) {
        // Pydantic validation errors
        const validationErrors = error.data.detail.map((err: any) => `${err.loc?.join('.') || 'Field'}: ${err.msg}`).join('<br>');
        errorMessage = `Validation errors:<br>${validationErrors}`;
      } else {
        // Single error message
        errorMessage = error.data.detail;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    addBotMessage(`❌ <strong>Submission Failed</strong><br><br>${errorMessage}<br><br>Please check your information and try again.`);
    showNotification(`Failed to submit request: ${errorMessage}`, "error");
  }
};

const showServices = () => {
  currentStage.value = "services";
  addBotMessage(
      "<strong>Our Services & Projects:</strong><br><br>" +
      "🌱 <strong>Plantation Support</strong><br>" +
      "Sustainable plantation management and advisory services<br><br>" +
      "👥 <strong>HRM Reform</strong><br>" +
      "Human Resource Management modernization and policy development<br><br>" +
      "💰 <strong>Investment Opportunities</strong><br>" +
      "Connect with investors and funding sources for plantation projects<br><br>" +
      "📦 <strong>Export Services</strong><br>" +
      "Access to Zengate Trade Platform and international markets<br><br>" +
      "🥑 <strong>Special Projects</strong><br>" +
      "Avocado cultivation, sustainable agriculture and innovation initiatives<br><br>" +
      "Would you like to connect with a director for any of these services?",
      {
        options: [
          {label: "Yes, connect me with a director", value: "director"},
          {label: "Submit a service request", value: "submit_request"},
          {label: "Tell me more", value: "info"},
        ],
      }
  );
};

const showPartnership = () => {
  currentStage.value = "partnership";
  addBotMessage(
      "<strong>Partnership & Investment Opportunities</strong><br><br>" +
      "PPA offers various partnership models for growth and collaboration:<br><br>" +
      "• <strong>Associate Membership</strong> - Join our network of planters<br>" +
      "• <strong>Investment in plantation projects</strong> - Direct funding opportunities<br>" +
      "• <strong>Joint ventures</strong> - Collaborative business development<br>" +
      "• <strong>Export partnerships</strong> - Access international markets together<br><br>" +
      "Please share your contact details and our team will reach out to discuss customized opportunities.",
      {showLeadForm: true}
  );
};

const showGeneralInfo = () => {
  currentStage.value = "info";
  addBotMessage(
      "<strong>About PPA Virtual Office</strong><br><br>" +
      "The Proprietary Planters Alliance (PPA) is Sri Lanka's pioneering digital platform connecting proprietary planters with modern solutions, funding, and markets.<br><br>" +
      "<strong>What makes us unique:</strong><br>" +
      "• First comprehensive digital hub for Sri Lankan planters<br>" +
      "• Direct access to expert directors and specialized services<br>" +
      "• End-to-end support from planning to market access<br>" +
      "• Proven track record in sustainable agriculture and HRM reform<br><br>" +
      "Explore our key resources and documents:",
      {quickActions: true}
  );
};

const askForLeadCapture = () => {
  currentStage.value = "lead_capture";
  addBotMessage("", {showLeadForm: true});
};

const submitLead = async (subscribe: boolean) => {
  leadLoading.value = true;

  if (subscribe && (leadInfo.value.email || leadInfo.value.phone)) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (leadInfo.value.name) {
        localStorage.setItem("ppa_user_name", leadInfo.value.name);
      }

      leadLoading.value = false;
      addBotMessage(
          "✅ Great! You've been added to our mailing list.<br>" +
          "We'll keep you updated on PPA's news, projects, and funding opportunities.<br><br>" +
          "Thank you for joining the PPA community!"
      );
      showNotification("Successfully subscribed to PPA updates!", "success");
    } catch (error) {
      leadLoading.value = false;
      showNotification("Subscription failed. Please try again.", "error");
    }
  } else {
    leadLoading.value = false;
    addBotMessage(
        "No problem! Feel free to explore our website and return anytime.<br>" +
        "Our Virtual Office is always here to assist you with PPA services and information."
    );
  }

  // Reset lead form
  leadInfo.value = {
    name: "",
    email: "",
    phone: "",
    interest: "",
  };

  setTimeout(() => {
    addBotMessage("Is there anything else I can help you with today?", {
      quickActions: true,
    });
  }, 1500);
};

const handleQuickAction = (action: { label: string; value: string }) => {
  addUserMessage(action.label);

  setTimeout(() => {
    switch (action.value) {
      case "funding":
        addBotMessage(
            "<strong>PPA Funding Calendar 2025</strong><br><br>" +
            "📅 <strong>Q1:</strong> Sustainable Agriculture Grants (Jan-Mar)<br>" +
            "📅 <strong>Q2:</strong> Export Development Fund (Apr-Jun)<br>" +
            "📅 <strong>Q3:</strong> Technology Adoption Support (Jul-Sep)<br>" +
            "📅 <strong>Q4:</strong> Climate Resilience Funding (Oct-Dec)<br><br>" +
            "Each funding cycle has specific eligibility criteria and application deadlines.<br>" +
            "Contact a director for detailed application guidance and personalized support.",
            {
              options: [
                {label: "Connect with Funding Expert", value: "director"},
                {label: "Learn More About Requirements", value: "info"},
              ],
            }
        );
        break;
      case "reform":
        addBotMessage(
            "<strong>Plantation Reform Act</strong><br><br>" +
            "The comprehensive legislation framework for modernizing Sri Lanka's plantation sector:<br><br>" +
            "• <strong>Land Rights</strong> - Clearer ownership and usage rights<br>" +
            "• <strong>Worker Welfare</strong> - Enhanced living and working conditions<br>" +
            "• <strong>Sustainability Standards</strong> - Environmental compliance requirements<br>" +
            "• <strong>Technology Integration</strong> - Digital transformation support<br><br>" +
            "Our directors provide expert guidance on compliance and implementation strategies.",
            {
              options: [
                {label: "Discuss Compliance Strategy", value: "director"},
                {label: "More Reform Information", value: "info"},
              ],
            }
        );
        break;
      case "hrm":
        addBotMessage(
            "<strong>HRM Ministry Proposal</strong><br><br>" +
            "Our comprehensive Human Resource Management modernization proposal submitted to the Ministry:<br><br>" +
            "• <strong>Digital HR Systems</strong> - Automated workforce management<br>" +
            "• <strong>Skills Development</strong> - Training programs for plantation workers<br>" +
            "• <strong>Fair Wage Framework</strong> - Structured compensation systems<br>" +
            "• <strong>Worker Welfare Programs</strong> - Health, safety, and housing initiatives<br>" +
            "• <strong>Performance Management</strong> - Merit-based evaluation systems<br><br>" +
            "Connect with our HRM specialists for implementation guidance.",
            {
              options: [
                {label: "Talk to HR Expert", value: "director"},
                {label: "Implementation Timeline", value: "info"},
              ],
            }
        );
        break;
      case "avocado":
        addBotMessage(
            "<strong>Avocado Project Details</strong><br><br>" +
            "Sri Lanka's pioneering commercial avocado cultivation initiative:<br><br>" +
            "🥑 <strong>Project Scope:</strong><br>" +
            "• 500+ acre pilot cultivation program<br>" +
            "• Premium variety selection and testing<br>" +
            "• Sustainable farming techniques<br>" +
            "• Export market development<br><br>" +
            "📊 <strong>Expected Outcomes:</strong><br>" +
            "• 40% higher yield than traditional crops<br>" +
            "• Direct access to international markets<br>" +
            "• Year-round income stability for farmers<br><br>" +
            "Join our avocado cultivation program today!",
            {
              options: [
                {label: "Join Avocado Program", value: "director"},
                {label: "Investment Opportunities", value: "partnership"},
              ],
            }
        );
        break;
      case "zengate":
        addBotMessage(
            "<strong>Zengate Trade Platform</strong><br><br>" +
            "Your digital gateway to international agricultural markets:<br><br>" +
            "🌐 <strong>Platform Features:</strong><br>" +
            "• Direct buyer-seller connections worldwide<br>" +
            "• Real-time commodity pricing and market trends<br>" +
            "• Integrated logistics and shipping coordination<br>" +
            "• Secure payment processing and trade finance<br>" +
            "• Quality certification and compliance tracking<br><br>" +
            "📈 <strong>Success Statistics:</strong><br>" +
            "• 200+ international buyers registered<br>" +
            "• 40% faster export processing<br>" +
            "• 25% higher profit margins for farmers<br><br>" +
            "Register through our export specialists for personalized onboarding.",
            {
              options: [
                {label: "Connect with Export Expert", value: "director"},
                {label: "Platform Registration", value: "submit_request"},
              ],
            }
        );
        break;
    }
  }, 500);
};

const sendUserMessage = () => {
  if (!userMessage.value.trim()) return;

  addUserMessage(userMessage.value);
  const msg = userMessage.value.toLowerCase();
  userMessage.value = "";

  // Keyword responses with professional tone
  setTimeout(() => {
    if (msg.match(/\b(hello|hi|hey|good morning|good afternoon|good evening|greetings)\b/)) {
      addBotMessage("Hello! Welcome to the PPA Virtual Office. How may I assist you today?", {
        options: [
          {label: "Connect with a Director", value: "director", icon: "1️⃣"},
          {label: "Explore Services", value: "services", icon: "2️⃣"},
          {label: "Partnership Information", value: "partnership", icon: "3️⃣"},
        ],
      });
    } else if (msg.includes("director") || msg.includes("expert")) {
      showDirectors();
    } else if (msg.match(/\b(service|help|support|assist|consultation)\b/)) {
      showServices();
    } else if (msg.match(/\b(fund|grant|money|investment|financial|loan)\b/)) {
      handleQuickAction({label: "Funding Calendar", value: "funding"});
    } else if (msg.match(/\b(export|trade|international|market|zengate)\b/)) {
      handleQuickAction({label: "Zengate Trade Platform", value: "zengate"});
    } else if (msg.match(/\b(avocado|cultivation|farming|agriculture)\b/)) {
      handleQuickAction({label: "Avocado Project", value: "avocado"});
    } else if (msg.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
      addBotMessage("You're very welcome! I'm here to assist you with any PPA-related inquiries. Is there anything else I can help you with?", {
        quickActions: true,
      });
    } else if (msg.match(/\b(bye|goodbye|see you|farewell|exit)\b/)) {
      addBotMessage(
          "Thank you for visiting the PPA Virtual Office! Have a great day, and feel free to return anytime for assistance with plantation services, funding opportunities, or expert consultations."
      );
    } else {
      addBotMessage(
          `I understand you're asking about: "${userMessage.value || msg}"<br><br>` +
          `As your virtual receptionist, let me help you find the most relevant information and connect you with the right resources.<br><br>` +
          `What would you like to do?`,
          {
            options: [
              {label: "Connect with a Director", value: "director", icon: "1️⃣"},
              {label: "Explore Services & Projects", value: "services", icon: "2️⃣"},
              {label: "General Information", value: "info", icon: "4️⃣"},
            ],
          }
      );
    }
  }, 500);
};

const markAsRead = () => {
  messages.value.forEach((msg) => {
    if (!msg.isSent && !msg.isRead) {
      msg.isRead = true;
    }
  });
  unreadCount.value = 0;
};

const getLastMessagePreview = (): string => {
  if (messages.value.length === 0) return "Start your PPA journey";
  const lastMsg = messages.value[messages.value.length - 1];
  const text = lastMsg.text || "";
  const plainText = text.replace(/<[^>]*>/g, ""); // Remove HTML
  return plainText.length > 40 ? plainText.substring(0, 40) + "..." : plainText;
};

// Scrollbar visibility on scroll
let scrollTimer: number;
const onChatScroll = () => {
  const el = messageScroll.value;
  if (!el) return;
  el.classList.add("is-scrolling");
  window.clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    el.classList.remove("is-scrolling");
  }, 900);
};

const scrollToBottom = () => {
  if (messageScroll.value) {
    messageScroll.value.scrollTop = messageScroll.value.scrollHeight;
  }
};

const showNotification = (text: string, color: string) => {
  snackbar.value = {show: true, text, color};
};

// Lifecycle
onMounted(async () => {
  // Check for returning user
  const userName = localStorage.getItem("ppa_user_name");
  if (userName) {
    currentStatus.value = `Welcome back, ${userName}!`;
  }

  // Load services data when component mounts
  await loadServices()

  // Show help message after 2 seconds delay
  setTimeout(() => {
    if (!chatOpen.value) {
      showHelpMessage.value = true;
      // Auto-hide after 3 seconds
      setTimeout(() => {
        showHelpMessage.value = false;
      }, 3000);
    }
  }, 2000);
});
</script>

<style scoped>
/* Chat Container */
.chat-container {
  position: fixed;
  bottom: 0;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

/* Chat Window */
.chat-window {
  width: 400px;
  max-width: calc(100vw - 48px);
  background: white;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  animation: slideUp 0.3s ease-out;
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.chat-window:not(.minimized) {
  height: 650px;
}

.chat-window.minimized {
  height: 72px;
  width: 320px;
}

/* Header */
.chat-header {
  background: rgb(var(--v-theme-success));
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.bot-name {
  font-weight: 600;
  font-size: 16px;
  color: white;
}

.bot-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 2px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #8BC34A;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.header-actions {
  display: flex;
  gap: 4px;
}

.header-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

/* Messages */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow: hidden;
  background: #f8f9fa;
}

.messages-scroll {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.messages-scroll::-webkit-scrollbar {
  display: none;
}

.message-block {
  display: flex;
  flex-direction: column;
}

.date-separator {
  text-align: center;
  padding: 8px 16px;
  margin: 16px 0;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  background: white;
  border-radius: 20px;
  align-self: center;
}

/* Bot Messages */
.bot-message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 90%;
}

.bot-message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.bot-label {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
}

.bot-message-content {
  background: white;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: 100%;
}

.message-text {
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

/* Director Selection */
.directors-section {
  margin-top: 12px;
}

.directors-intro {
  font-size: 14px;
  margin-bottom: 16px;
  color: #374151;
  font-weight: 500;
}

.directors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.director-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  background: #fafbfc;
}

.director-card:hover {
  border-color: rgb(var(--v-theme-success));
  background: rgba(76, 175, 80, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.director-avatar {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.director-info {
  text-align: center;
}

.director-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.director-role {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

/* Director Office Info */
.director-office-info {
  margin-top: 12px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.office-header {
  font-size: 15px;
  color: #1f2937;
  margin-bottom: 12px;
}

.office-actions {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 16px;
}

.office-actions ul {
  margin: 8px 0;
  padding-left: 20px;
}

.office-actions li {
  margin: 4px 0;
}

.office-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Message Options */
.message-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.option-btn {
  font-size: 13px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  padding: 8px 12px !important;
  height: auto !important;
  line-height: 1.3 !important;
}

.option-icon {
  margin-right: 6px;
}

/* Forms */
.chat-form {
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.form-intro {
  font-size: 14px;
  color: #374151;
  margin-bottom: 16px;
  font-weight: 500;
}

.lead-form {
  background: linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%);
}

.lead-intro {
  font-size: 14px;
  color: #374151;
  margin-bottom: 16px;
  font-weight: 500;
  line-height: 1.5;
}

.form-field {
  margin-bottom: 12px !important;
}

.submit-btn {
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px !important;
  height: auto !important;
  margin-top: 8px;
}

.form-note {
  margin-top: 8px;
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

.lead-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.lead-btn {
  flex: 1;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 8px !important;
  height: auto !important;
  font-size: 13px !important;
}

/* Quick Links */
.quick-links-section {
  margin-top: 16px;
}

.quick-links-title {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12px;
}

.quick-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.quick-link-btn {
  font-size: 12px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  padding: 6px 10px !important;
  height: auto !important;
}

.message-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 8px;
  margin-left: 32px;
}

/* User Messages */
.user-message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 85%;
  align-self: flex-end;
}

.user-message-bubble {
  background: rgb(var(--v-theme-success));
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 100%;
  word-wrap: break-word;
}

.user-message-time {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 6px;
}

/* Typing Indicator */
.typing-bubble {
  background: white;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-top: 8px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: rgb(var(--v-theme-success));
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-6px) scale(1.1);
    opacity: 1;
  }
}

/* Input Area */
.chat-input-area {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  padding: 8px 0;
}

.message-input::placeholder {
  color: #9ca3af;
}

.send-btn {
  background: transparent !important;
  box-shadow: none !important;
  min-width: auto !important;
  padding: 8px !important;
}

.send-btn:hover {
  background: rgba(76, 175, 80, 0.1) !important;
}

/* Minimized Chat */
.minimized-chat {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  position: relative;
  background: rgb(var(--v-theme-success));
  color: white;
  transition: all 0.2s ease;
}

.minimized-chat:hover {
  opacity: 0.9;
}

.minimized-content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.minimized-info {
  flex: 1;
}

.minimized-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.minimized-preview {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.minimized-close {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  background: rgba(255, 255, 255, 0.1) !important;
}

.minimized-chat:hover .minimized-close {
  opacity: 1;
}

/* FAB */
.chat-fab {
  border-radius: 50% !important;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.chat-fab:hover {
  transform: translateY(-2px);
}

/* Help Message Bubble */
.help-message-bubble {
  position: fixed;
  bottom: 90px;
  right: 30px;
  background: white;
  padding: 12px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  animation: slideInBounce 0.5s ease-out;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.08);
  max-width: 200px;
  transition: all 0.2s ease;
}

.help-message-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.help-message-text {
  white-space: nowrap;
}

.help-message-arrow {
  position: absolute;
  bottom: -6px;
  right: 20px;
  width: 12px;
  height: 12px;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transform: rotate(45deg);
}

@keyframes slideInBounce {
  0% {
    transform: translateX(100px) scale(0.8);
    opacity: 0;
  }
  60% {
    transform: translateX(-5px) scale(1.02);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

/* Animations */
@keyframes slideUp {
  from {
    transform: translateY(100%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .chat-container {
    right: 16px;
    left: 16px;
  }

  .chat-window {
    width: 100%;
    max-width: none;
  }

  .chat-window:not(.minimized) {
    height: calc(100vh - 32px);
  }

  .directors-grid {
    grid-template-columns: 1fr;
  }

  .lead-actions {
    flex-direction: column;
  }

  .office-options {
    flex-direction: column;
  }
}
</style>