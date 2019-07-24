<template>
	<div class="contact-page">
		<h1>{{ $t('main.contact') }}</h1>
		<div class="contact-page__container">
			<el-form label-position="top" :model="message" class="contact-page__container__form">
				<el-row>
					<el-col>
						<el-form-item v-bind:label="$t('main.message_name')">
							<el-input v-model="message.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item v-bind:label="$t('main.message_phone')">
							<el-input v-model="message.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item v-bind:label="$t('main.message_mail')">
							<el-input v-model="message.mail"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item v-bind:label="$t('main.message_message')">
							<el-input v-model="message.content"
									type="textarea"
									:rows="5" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item size="large">
					<el-button v-bind:disabled="isDisabled" type="primary" @click="sendMessage">{{ $t('main.send') }}</el-button>
				</el-form-item>
			</el-form>

			<div class="contact-page__container__info">
				<gmap-map
					:center="center"
					:zoom="17"
				>
					<gmap-marker
						:key="index"
						v-for="(m, index) in markers"
						:position="m.position"
						:clickable="true"
						:draggable="true"
						@click="center=m.position"
					></gmap-marker>
				</gmap-map>

				<div class="contact">
					<el-popover
						ref="popover1"
						placement="top-start"
						v-bind:title="$t('main.contact_schedule')"
						width="200"
						:visible-arrow="false"
						trigger="hover">
						<div>
							<p>{{$t('main.contact_day1')}} <span>{{$t('main.contact_schedule_afternoon')}}</span></p>
							<p class="no-margin">{{$t('main.contact_day2')}} <span>{{$t('main.contact_schedule_morning')}}</span></p>
							<p class="right-aligned">{{$t('main.contact_schedule_afternoon')}}</p>
							<p class="no-margin">{{$t('main.contact_day3')}} <span>{{$t('main.contact_schedule_morning')}}</span></p>
							<p class="right-aligned">{{$t('main.contact_schedule_afternoon')}}</p>
							<p class="no-margin">{{$t('main.contact_day4')}} <span>{{$t('main.contact_schedule_morning')}}</span></p>
							<p class="right-aligned">{{$t('main.contact_schedule_afternoon')}}</p>
							<p class="no-margin">{{$t('main.contact_day5')}} <span>{{$t('main.contact_schedule_morning')}}</span></p>
							<p class="right-aligned">{{$t('main.contact_schedule_afternoon')}}</p>
							<p class="no-margin">{{$t('main.contact_day6')}} <span>{{$t('main.contact_schedule_morning')}}</span></p>
							<p class="right-aligned">{{$t('main.contact_schedule_afternoon')}}</p>
							<p>{{$t('main.contact_day7')}}</p>
						</div>
					</el-popover>

					<p style="margin: 0;"><i class="el-icon-location"></i>{{$t('main.contact_address1')}}</p>
					<p style="margin-left: 20px;">{{$t('main.contact_address2')}}</p>
					<p><i class="el-icon-phone"></i>{{$t('main.contact_phone')}}</p>
					<p><i class="el-icon-message"></i><a v-bind:href="mailTo" target="_top">{{$t('main.contact_mail')}}</a></p>
					<p v-popover:popover1><i class="el-icon-time"></i>{{$t('main.contact_schedule')}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ContactService from '@/services/contact'

export default {
  data() {
    return {
      message: {},
      center: { lat: parseFloat(process.env.VUE_APP_MAP_LATITUDE), lng: parseFloat(process.env.VUE_APP_MAP_LONGITUDE) },
      markers: [{
        position: { lat: parseFloat(process.env.VUE_APP_MAP_LATITUDE), lng: parseFloat(process.env.VUE_APP_MAP_LONGITUDE) },
      }],
    }
  },

  computed: {
    isDisabled() {
      return !this.message.name || !this.message.mail || !this.message.content
    },

    mailTo() {
      return `mailto:${this.$t('main.contact_mail')}`;
    },
  },

  methods: {
    sendMessage() {
      ContactService.sendMail(this.message).then(() => {
        this.$alert(this.$t('main.message_sent_message'), this.$t('main.message_sent_title'), {
          confirmButtonText: this.$t('main.accept'),
        })
      }).catch(() => {
        this.$alert(this.$t('main.message_sent_message_error'), this.$t('main.message_sent_title_error'), {
          confirmButtonText: this.$t('main.accept'),
        })
      })
    },
  },
}
</script>
