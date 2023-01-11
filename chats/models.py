from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE,primary_key=True)
    photo = models.ImageField(null=True, blank=True, default='girl.svg')
    status = models.CharField(default="Hi", max_length=255)
    online = models.BooleanField(default=False)
    gender = models.CharField(max_length=10)
    relationship = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=500)
    detaillocation = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=10)
    # date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user_id=instance.pk)


class Message(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True, blank=True)
    sender = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='receiver', on_delete=models.CASCADE)



from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.core.mail import EmailMultiAlternatives


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    # send_mail(
    #     # title:
    #     "Password Reset for {title}".format(title="Some website title"),
    #     # message:
    #     email_plaintext_message,
    #     # from:
    #     "lehaquangthinh@gmail.com",
    #     # to:
    #     [reset_password_token.user.email]
    # )
    # html_body = render_to_string("email-templates.html")

    html_body=f"""
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {{text-decoration: underline !important;}}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">

    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">

                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:28px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="{"https://webbb-tau.vercel.app/api/password_reset/"+reset_password_token.key}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"><strong>NT207.N11.ATCL</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>"""

    message = EmailMultiAlternatives(
        subject='HTML Email reset of Nhom9',
        body="mail reset",
        from_email='lehaquangthinh@gmail.com',
        to=[reset_password_token.user.email]
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)
from django_resized import ResizedImageField
from django.db.models.deletion import CASCADE
class ImageUpload1(models.Model):
    title = models.CharField(max_length=50)
    # images = models.ImageField('images')
    images1 = ResizedImageField(scale=0.5, quality=75, upload_to='whatever1')
    owner = models.OneToOneField(User, related_name="img1", null=True, on_delete=CASCADE)
    updated_date = models.DateTimeField(auto_now_add=True)
class ImageUpload2(models.Model):
    title = models.CharField(max_length=50)
    # images = models.ImageField('images')
    images2 = ResizedImageField(scale=0.5, quality=75, upload_to='whatever2')
    owner = models.OneToOneField(User, related_name="img2", null=True, on_delete=CASCADE)
    updated_date = models.DateTimeField(auto_now_add=True)

class UserProfileModel(models.Model):
    gender = models.CharField(max_length=10)
    relationship = models.CharField(max_length=50)
    location = models.CharField(max_length=500)
    detaillocation = models.CharField(max_length=500)
    user = models.OneToOneField(User, related_name="userprofile", null=True, on_delete=CASCADE)
    phone_number = models.CharField(max_length=10)
    birth_day = models.CharField(max_length=10)
    # def __str__(self):
    #     return self.user

