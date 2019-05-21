import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectLibrary } from 'Reducers/library'
import VideoCardList from 'Components/VideoCardList'
import RouterLoading from 'Components/RouterLoading'
import style from '../../style.scss'

class VideoSection extends React.Component {
  componentDidMount() {
    if (this.props.library.data.videos.length == 0) {
      this.props.getVideos()
    }
  }

  render() {
    if (!this.props.library.data || this.props.library.loading) {
      return <RouterLoading />
    }
    return (
      <div className={style.videoContainer}>
        <VideoCardList data={this.props.library.data.videos} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {
    getVideos: () => dispatch(actions.loadVideos()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(VideoSection)
{
	"videos": [
			{
					"uuid": "a7d950fa-a4d1-45fd-a9d7-a986a27137de",
					"title": "h7Iw8rH8z_A.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/a7d950fa-a4d1-45fd-a9d7-a986a27137de/h7Iw8rH8z_A.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a7d950fa-a4d1-45fd-a9d7-a986a27137de/0/0.jpg"
			},
			{
					"uuid": "21bdf540-67f0-411b-b197-60b6ed5eda9d",
					"title": "IjTpULrwfoFg-Hkq.mp4?tag=9",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/21bdf540-67f0-411b-b197-60b6ed5eda9d/IjTpULrwfoFg-Hkq.mp4?tag=9",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/21bdf540-67f0-411b-b197-60b6ed5eda9d/0/0.jpg"
			},
			{
					"uuid": "2d5ba33a-7b10-4a65-9604-235ed3e0f9d0",
					"title": "59192753_424381304804927_4226890110148280320_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/2d5ba33a-7b10-4a65-9604-235ed3e0f9d0/59192753_424381304804927_4226890110148280320_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2d5ba33a-7b10-4a65-9604-235ed3e0f9d0/0/0.jpg"
			},
			{
					"uuid": "90099810-2a83-4774-a63c-363e0d27cd41",
					"title": "RtLVfPib79v3Il37.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/90099810-2a83-4774-a63c-363e0d27cd41/RtLVfPib79v3Il37.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/90099810-2a83-4774-a63c-363e0d27cd41/0/0.jpg"
			},
			{
					"uuid": "dd87b0c3-07f4-4d5a-bb04-ae0542ac5b7f",
					"title": "FDHICvZaeZQ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/dd87b0c3-07f4-4d5a-bb04-ae0542ac5b7f/FDHICvZaeZQ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/dd87b0c3-07f4-4d5a-bb04-ae0542ac5b7f/0/0.jpg"
			},
			{
					"uuid": "bee8f7a1-df03-4c73-bf5c-0c926b874580",
					"title": "uWDASwq7wggzTi2o.mp4?tag=9",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/bee8f7a1-df03-4c73-bf5c-0c926b874580/uWDASwq7wggzTi2o.mp4?tag=9",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/bee8f7a1-df03-4c73-bf5c-0c926b874580/0/0.jpg"
			},
			{
					"uuid": "cad1aabb-af29-4496-970b-df8a341f379b",
					"title": "58325385_437701660297033_3120512839710670848_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/cad1aabb-af29-4496-970b-df8a341f379b/58325385_437701660297033_3120512839710670848_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/cad1aabb-af29-4496-970b-df8a341f379b/0/0.jpg"
			},
			{
					"uuid": "08bcf105-1288-4f85-bead-3c63ed9a2399",
					"title": "T3v-sB8wb_cMY34j.mp4?tag=9",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/08bcf105-1288-4f85-bead-3c63ed9a2399/T3v-sB8wb_cMY34j.mp4?tag=9",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/08bcf105-1288-4f85-bead-3c63ed9a2399/0/0.jpg"
			},
			{
					"uuid": "cc363a14-d1e9-4cc5-a11c-e0d1e5453b3d",
					"title": "6OSwl-51TpmUHZkD.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/cc363a14-d1e9-4cc5-a11c-e0d1e5453b3d/6OSwl-51TpmUHZkD.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/cc363a14-d1e9-4cc5-a11c-e0d1e5453b3d/0/0.jpg"
			},
			{
					"uuid": "8138c268-74db-489c-a163-f47c7bedee9e",
					"title": "xF1NDe7fP_Geg67a.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/8138c268-74db-489c-a163-f47c7bedee9e/xF1NDe7fP_Geg67a.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/8138c268-74db-489c-a163-f47c7bedee9e/0/0.jpg"
			},
			{
					"uuid": "71aa1ff7-a413-4a2d-899e-fc7296fcbfbd",
					"title": "yXMeXC0LuLY.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/71aa1ff7-a413-4a2d-899e-fc7296fcbfbd/yXMeXC0LuLY.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/71aa1ff7-a413-4a2d-899e-fc7296fcbfbd/0/0.jpg"
			},
			{
					"uuid": "8c44d4d3-8125-46ae-924a-cd97763e5114",
					"title": "iR9r5qQ5EcnG2Ibe.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/8c44d4d3-8125-46ae-924a-cd97763e5114/iR9r5qQ5EcnG2Ibe.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/8c44d4d3-8125-46ae-924a-cd97763e5114/0/0.jpg"
			},
			{
					"uuid": "9f8b815a-d3c5-47be-8d5a-a7af27d104cd",
					"title": "58842075_831428280556234_8557352304372613120_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/9f8b815a-d3c5-47be-8d5a-a7af27d104cd/58842075_831428280556234_8557352304372613120_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9f8b815a-d3c5-47be-8d5a-a7af27d104cd/0/0.jpg"
			},
			{
					"uuid": "2f279da2-a61c-49bb-a269-4bc117ca152c",
					"title": "HyK6HwFeLNByWuGC.mp4?tag=12",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/2f279da2-a61c-49bb-a269-4bc117ca152c/HyK6HwFeLNByWuGC.mp4?tag=12",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2f279da2-a61c-49bb-a269-4bc117ca152c/0/0.jpg"
			},
			{
					"uuid": "d4427add-ed1d-43dd-9f60-2329abefe80f",
					"title": "z2dSq8awbWc.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/d4427add-ed1d-43dd-9f60-2329abefe80f/z2dSq8awbWc.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d4427add-ed1d-43dd-9f60-2329abefe80f/0/0.jpg"
			},
			{
					"uuid": "d01a6aa3-69d1-40ae-a0a2-4623d0b4a9c9",
					"title": "fL01sO_4LRfdNdBI.mp4?tag=12",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d01a6aa3-69d1-40ae-a0a2-4623d0b4a9c9/fL01sO_4LRfdNdBI.mp4?tag=12",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d01a6aa3-69d1-40ae-a0a2-4623d0b4a9c9/0/0.jpg"
			},
			{
					"uuid": "54c51322-c5c6-4a15-a110-8f452f3281ce",
					"title": "AQNeW453F6o.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/54c51322-c5c6-4a15-a110-8f452f3281ce/AQNeW453F6o.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/54c51322-c5c6-4a15-a110-8f452f3281ce/0/0.jpg"
			},
			{
					"uuid": "451f0129-c2fe-4753-887b-83151286a01e",
					"title": "ckLM2loewf27CSbh.mp4?tag=12",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/451f0129-c2fe-4753-887b-83151286a01e/ckLM2loewf27CSbh.mp4?tag=12",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/451f0129-c2fe-4753-887b-83151286a01e/0/0.jpg"
			},
			{
					"uuid": "48451044-ab73-44f8-b69b-d98186bca1fa",
					"title": "ghrYqlXcE7NW_x2-.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/48451044-ab73-44f8-b69b-d98186bca1fa/ghrYqlXcE7NW_x2-.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/48451044-ab73-44f8-b69b-d98186bca1fa/0/0.jpg"
			},
			{
					"uuid": "31ce5129-84cf-41b4-97bb-dc2bfd32a563",
					"title": "stS9pgmrRYIu4cG4.mp4?tag=12",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/31ce5129-84cf-41b4-97bb-dc2bfd32a563/stS9pgmrRYIu4cG4.mp4?tag=12",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/31ce5129-84cf-41b4-97bb-dc2bfd32a563/0/0.jpg"
			},
			{
					"uuid": "2c0251d2-09d9-4089-ae06-54f7160c2f17",
					"title": "p-tbGUxBPgsYBJyi.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/2c0251d2-09d9-4089-ae06-54f7160c2f17/p-tbGUxBPgsYBJyi.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2c0251d2-09d9-4089-ae06-54f7160c2f17/0/0.jpg"
			},
			{
					"uuid": "c6a23080-0b63-4d0b-a4a4-2293a36c366c",
					"title": "uIBC_2WUd6dYK5Y_.mp4?tag=12",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/c6a23080-0b63-4d0b-a4a4-2293a36c366c/uIBC_2WUd6dYK5Y_.mp4?tag=12",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/c6a23080-0b63-4d0b-a4a4-2293a36c366c/0/0.jpg"
			},
			{
					"uuid": "83fc0507-0d9c-4da4-a4bf-1673a3f0c98d",
					"title": "FSEKZyFI9Hr8d2Tq.mp4?tag=9",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/83fc0507-0d9c-4da4-a4bf-1673a3f0c98d/FSEKZyFI9Hr8d2Tq.mp4?tag=9",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/83fc0507-0d9c-4da4-a4bf-1673a3f0c98d/0/0.jpg"
			},
			{
					"uuid": "e742f269-ad7f-4041-94fd-ae35ed24aacb",
					"title": "Yckfar3j6HunjZnu.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e742f269-ad7f-4041-94fd-ae35ed24aacb/Yckfar3j6HunjZnu.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e742f269-ad7f-4041-94fd-ae35ed24aacb/0/0.jpg"
			},
			{
					"uuid": "469cfca2-288c-4126-b249-3e58186671fa",
					"title": "4XetMwm1_cC-asIV.mp4?tag=10",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/469cfca2-288c-4126-b249-3e58186671fa/4XetMwm1_cC-asIV.mp4?tag=10",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/469cfca2-288c-4126-b249-3e58186671fa/0/0.jpg"
			},
			{
					"uuid": "aa6ade5b-f4ca-46d3-9217-60fd5d6f7e3a",
					"title": "58604118_437359293504487_4487978702465925120_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/aa6ade5b-f4ca-46d3-9217-60fd5d6f7e3a/58604118_437359293504487_4487978702465925120_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/aa6ade5b-f4ca-46d3-9217-60fd5d6f7e3a/0/0.jpg"
			},
			{
					"uuid": "70af2ce5-32a6-4e3d-ace3-23ec2bb3a096",
					"title": "Z_ChZHy3g_GVwkqk.mp4?tag=9",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/70af2ce5-32a6-4e3d-ace3-23ec2bb3a096/Z_ChZHy3g_GVwkqk.mp4?tag=9",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/70af2ce5-32a6-4e3d-ace3-23ec2bb3a096/0/0.jpg"
			},
			{
					"uuid": "4beaf089-b456-4f5a-99b9-70b035cc1101",
					"title": "59406642_642338719551412_3115451207867432960_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/4beaf089-b456-4f5a-99b9-70b035cc1101/59406642_642338719551412_3115451207867432960_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/4beaf089-b456-4f5a-99b9-70b035cc1101/0/0.jpg"
			},
			{
					"uuid": "4889fcec-f14c-4147-98bc-4b707a6059f9",
					"title": "gZGFFux9BQtF3k_S.mp4?tag=13",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/4889fcec-f14c-4147-98bc-4b707a6059f9/gZGFFux9BQtF3k_S.mp4?tag=13",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/4889fcec-f14c-4147-98bc-4b707a6059f9/0/0.jpg"
			},
			{
					"uuid": "471ce1cd-a412-4d7e-8175-be6c221feab0",
					"title": "58652326_1372672532873492_3922979641622528000_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/471ce1cd-a412-4d7e-8175-be6c221feab0/58652326_1372672532873492_3922979641622528000_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/471ce1cd-a412-4d7e-8175-be6c221feab0/0/0.jpg"
			},
			{
					"uuid": "471f7ad6-0618-47ce-8b8e-c670f219b423",
					"title": "4l2NK12SyFpDkv9N.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/471f7ad6-0618-47ce-8b8e-c670f219b423/4l2NK12SyFpDkv9N.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/471f7ad6-0618-47ce-8b8e-c670f219b423/0/0.jpg"
			},
			{
					"uuid": "3e1fa3e1-3790-4aaa-bd11-db28db69888c",
					"title": "84_adlvaJ3d_KePr.mp4?tag=10",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/3e1fa3e1-3790-4aaa-bd11-db28db69888c/84_adlvaJ3d_KePr.mp4?tag=10",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/3e1fa3e1-3790-4aaa-bd11-db28db69888c/0/0.jpg"
			},
			{
					"uuid": "adb6f206-841c-44f3-a463-11341cbfe0b5",
					"title": "LQ-eMk3C5j_DPnv-.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/adb6f206-841c-44f3-a463-11341cbfe0b5/LQ-eMk3C5j_DPnv-.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/adb6f206-841c-44f3-a463-11341cbfe0b5/0/0.jpg"
			},
			{
					"uuid": "4bff0a48-6ca8-4d95-9e82-b0cd85c00ab1",
					"title": "qogpVQe4t-c.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/4bff0a48-6ca8-4d95-9e82-b0cd85c00ab1/qogpVQe4t-c.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/4bff0a48-6ca8-4d95-9e82-b0cd85c00ab1/0/0.jpg"
			},
			{
					"uuid": "bd8e1a13-a72f-4e24-bf93-e8509b1646ce",
					"title": "ayuRST8RACQ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/bd8e1a13-a72f-4e24-bf93-e8509b1646ce/ayuRST8RACQ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/bd8e1a13-a72f-4e24-bf93-e8509b1646ce/0/0.jpg"
			},
			{
					"uuid": "ad8cfb90-7ae8-4443-bae3-dbbb26299cda",
					"title": "GCj7w_ny0ixrj7cB.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/ad8cfb90-7ae8-4443-bae3-dbbb26299cda/GCj7w_ny0ixrj7cB.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/ad8cfb90-7ae8-4443-bae3-dbbb26299cda/0/0.jpg"
			},
			{
					"uuid": "10859703-34d7-4fcf-865c-ecc32f622732",
					"title": "SoGOtyDqDFboIF8h.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/10859703-34d7-4fcf-865c-ecc32f622732/SoGOtyDqDFboIF8h.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/10859703-34d7-4fcf-865c-ecc32f622732/0/0.jpg"
			},
			{
					"uuid": "79110705-be2c-472e-bc84-d77797b52923",
					"title": "peOpk6teXeA.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/79110705-be2c-472e-bc84-d77797b52923/peOpk6teXeA.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/79110705-be2c-472e-bc84-d77797b52923/0/0.jpg"
			},
			{
					"uuid": "509d1ce0-d968-42d0-8e95-b7f860d29016",
					"title": "UIEISPnwsBo.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/youtube/509d1ce0-d968-42d0-8e95-b7f860d29016/UIEISPnwsBo.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/509d1ce0-d968-42d0-8e95-b7f860d29016/0/0.jpg"
			},
			{
					"uuid": "cbf87d27-aad3-48e4-ba88-c3066b34dfef",
					"title": "05AG692t3vs4R9F7.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/cbf87d27-aad3-48e4-ba88-c3066b34dfef/05AG692t3vs4R9F7.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/cbf87d27-aad3-48e4-ba88-c3066b34dfef/0/0.jpg"
			},
			{
					"uuid": "c10f901f-decf-477d-90e3-a59309e6ce61",
					"title": "58336086_379802772619246_4675457752967938048_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/c10f901f-decf-477d-90e3-a59309e6ce61/58336086_379802772619246_4675457752967938048_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/c10f901f-decf-477d-90e3-a59309e6ce61/0/0.jpg"
			},
			{
					"uuid": "d6f5f7f3-389b-4050-87ec-9bdc08b6b09c",
					"title": "brCyWAFB-l4gCO4-.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d6f5f7f3-389b-4050-87ec-9bdc08b6b09c/brCyWAFB-l4gCO4-.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d6f5f7f3-389b-4050-87ec-9bdc08b6b09c/0/0.jpg"
			},
			{
					"uuid": "42e8cfdf-3e80-4774-8828-9710cb88c14e",
					"title": "58741487_2894955833855777_8404966418033934336_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/42e8cfdf-3e80-4774-8828-9710cb88c14e/58741487_2894955833855777_8404966418033934336_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/42e8cfdf-3e80-4774-8828-9710cb88c14e/0/0.jpg"
			},
			{
					"uuid": "07beaa60-d955-4a8b-b67d-0d61f363a66a",
					"title": "7RmvZezlo7F2L25k.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/07beaa60-d955-4a8b-b67d-0d61f363a66a/7RmvZezlo7F2L25k.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/07beaa60-d955-4a8b-b67d-0d61f363a66a/0/0.jpg"
			},
			{
					"uuid": "d5a2e1d8-7922-42eb-812d-6ade30a6bbbb",
					"title": "QqBiPI7Gu1mj2ePQ.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d5a2e1d8-7922-42eb-812d-6ade30a6bbbb/QqBiPI7Gu1mj2ePQ.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d5a2e1d8-7922-42eb-812d-6ade30a6bbbb/0/0.jpg"
			},
			{
					"uuid": "de2bdc4e-e4da-4272-9a8c-6028c6d683f4",
					"title": "B7dqL5vL2F8-aeJh.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/de2bdc4e-e4da-4272-9a8c-6028c6d683f4/B7dqL5vL2F8-aeJh.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/de2bdc4e-e4da-4272-9a8c-6028c6d683f4/0/0.jpg"
			},
			{
					"uuid": "d1ef877e-58e6-405c-84bc-5de36ad04af7",
					"title": "9XsSm-BHAeOmPBE5.mp4?tag=8",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d1ef877e-58e6-405c-84bc-5de36ad04af7/9XsSm-BHAeOmPBE5.mp4?tag=8",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d1ef877e-58e6-405c-84bc-5de36ad04af7/0/0.jpg"
			},
			{
					"uuid": "9d208aef-9c56-4375-be2b-f899a0eac0e1",
					"title": "58003644_289015745338918_3230786498697625600_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/9d208aef-9c56-4375-be2b-f899a0eac0e1/58003644_289015745338918_3230786498697625600_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9d208aef-9c56-4375-be2b-f899a0eac0e1/0/0.jpg"
			},
			{
					"uuid": "3916bdfa-0604-4b77-a417-3a0a6de7becf",
					"title": "57978591_2691184880923234_8540515250888245248_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/3916bdfa-0604-4b77-a417-3a0a6de7becf/57978591_2691184880923234_8540515250888245248_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/3916bdfa-0604-4b77-a417-3a0a6de7becf/0/0.jpg"
			},
			{
					"uuid": "586c1db9-f8ef-4b4e-abbb-3b6fa508fc56",
					"title": "Y7cfJhhDuHwgj4wd.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/586c1db9-f8ef-4b4e-abbb-3b6fa508fc56/Y7cfJhhDuHwgj4wd.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/586c1db9-f8ef-4b4e-abbb-3b6fa508fc56/0/0.jpg"
			},
			{
					"uuid": "c3a788b6-05fa-40a4-8345-b2ed962c593e",
					"title": "kJybw3xYq-LcG3Z1.mp4?tag=8",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/c3a788b6-05fa-40a4-8345-b2ed962c593e/kJybw3xYq-LcG3Z1.mp4?tag=8",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/c3a788b6-05fa-40a4-8345-b2ed962c593e/0/0.jpg"
			},
			{
					"uuid": "767ade6b-cf38-4af9-9521-25008298c6b9",
					"title": "58327252_377868263068281_1573593987674013696_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/767ade6b-cf38-4af9-9521-25008298c6b9/58327252_377868263068281_1573593987674013696_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/767ade6b-cf38-4af9-9521-25008298c6b9/0/0.jpg"
			},
			{
					"uuid": "713c66ee-2d81-4cfc-91eb-3f211a5fb974",
					"title": "NBb1KHHAB7n5P8wn.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/713c66ee-2d81-4cfc-91eb-3f211a5fb974/NBb1KHHAB7n5P8wn.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/713c66ee-2d81-4cfc-91eb-3f211a5fb974/0/0.jpg"
			},
			{
					"uuid": "7a1071e6-5431-4e8e-8925-5a923186638a",
					"title": "fFrC_Yu2KK_CFL6x.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/7a1071e6-5431-4e8e-8925-5a923186638a/fFrC_Yu2KK_CFL6x.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/7a1071e6-5431-4e8e-8925-5a923186638a/0/0.jpg"
			},
			{
					"uuid": "1be35693-d17d-4b62-aab3-cebab6566652",
					"title": "lEf78A_lgrhZZUnX.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/1be35693-d17d-4b62-aab3-cebab6566652/lEf78A_lgrhZZUnX.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/1be35693-d17d-4b62-aab3-cebab6566652/0/0.jpg"
			},
			{
					"uuid": "3f89877b-2316-4e45-950b-2f2cde0fb1c2",
					"title": "58571404_436782267084720_7085260182967564801_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/3f89877b-2316-4e45-950b-2f2cde0fb1c2/58571404_436782267084720_7085260182967564801_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/3f89877b-2316-4e45-950b-2f2cde0fb1c2/0/0.jpg"
			},
			{
					"uuid": "14a6406d-b3ee-448d-ad4a-39e15382d8c6",
					"title": "49FCoXmAeSrNRwyA.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/14a6406d-b3ee-448d-ad4a-39e15382d8c6/49FCoXmAeSrNRwyA.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/14a6406d-b3ee-448d-ad4a-39e15382d8c6/0/0.jpg"
			},
			{
					"uuid": "21b43b2c-78ec-42dd-b025-5ac643a8895f",
					"title": "hM3qQQvvtxBjDlDz.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/21b43b2c-78ec-42dd-b025-5ac643a8895f/hM3qQQvvtxBjDlDz.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/21b43b2c-78ec-42dd-b025-5ac643a8895f/0/0.jpg"
			},
			{
					"uuid": "e1032baa-7825-46af-bc99-c00ae6b100ab",
					"title": "iLKO7NNov7H5yv24.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e1032baa-7825-46af-bc99-c00ae6b100ab/iLKO7NNov7H5yv24.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e1032baa-7825-46af-bc99-c00ae6b100ab/0/0.jpg"
			},
			{
					"uuid": "53b94d7c-ce63-41e3-bdf4-5a7271d3e6f2",
					"title": "tSsX6yqUMPv49ZvA.mp4?tag=8",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/53b94d7c-ce63-41e3-bdf4-5a7271d3e6f2/tSsX6yqUMPv49ZvA.mp4?tag=8",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/53b94d7c-ce63-41e3-bdf4-5a7271d3e6f2/0/0.jpg"
			},
			{
					"uuid": "f3e788fa-40bc-4fb1-8058-f28fd58ebc0b",
					"title": "9MR40xw-R5uwtroT.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f3e788fa-40bc-4fb1-8058-f28fd58ebc0b/9MR40xw-R5uwtroT.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f3e788fa-40bc-4fb1-8058-f28fd58ebc0b/0/0.jpg"
			},
			{
					"uuid": "71240d9a-dde3-4ab1-be24-9432888b1bae",
					"title": "HbZi1uz2ZCtpbyX8.mp4?tag=8",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/71240d9a-dde3-4ab1-be24-9432888b1bae/HbZi1uz2ZCtpbyX8.mp4?tag=8",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/71240d9a-dde3-4ab1-be24-9432888b1bae/0/0.jpg"
			},
			{
					"uuid": "1ac91775-6aca-4c0a-9bf2-5077ea1c595b",
					"title": "58332155_272060097070914_1901308307415498752_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/1ac91775-6aca-4c0a-9bf2-5077ea1c595b/58332155_272060097070914_1901308307415498752_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/1ac91775-6aca-4c0a-9bf2-5077ea1c595b/0/0.jpg"
			},
			{
					"uuid": "08f9aafd-6825-403a-b557-bb6886abe39c",
					"title": "RmP82zof3e1Sh1Ny.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/08f9aafd-6825-403a-b557-bb6886abe39c/RmP82zof3e1Sh1Ny.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/08f9aafd-6825-403a-b557-bb6886abe39c/0/0.jpg"
			},
			{
					"uuid": "228fe9f3-f69f-4a4d-854f-dd8beb202a68",
					"title": "C7zPmxm9l0x3mh4E.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/228fe9f3-f69f-4a4d-854f-dd8beb202a68/C7zPmxm9l0x3mh4E.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/228fe9f3-f69f-4a4d-854f-dd8beb202a68/0/0.jpg"
			},
			{
					"uuid": "2012af89-58e9-4cff-aaca-bd109a585baa",
					"title": "a1zxHsOk2Ou9YG-U.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/2012af89-58e9-4cff-aaca-bd109a585baa/a1zxHsOk2Ou9YG-U.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2012af89-58e9-4cff-aaca-bd109a585baa/0/0.jpg"
			},
			{
					"uuid": "53ce77f3-6770-4e4c-9c51-53ebf44e96d9",
					"title": "VxLEUJyMfBDuTZhb.mp4?tag=11",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/53ce77f3-6770-4e4c-9c51-53ebf44e96d9/VxLEUJyMfBDuTZhb.mp4?tag=11",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/53ce77f3-6770-4e4c-9c51-53ebf44e96d9/0/0.jpg"
			},
			{
					"uuid": "70f83c9c-a86e-46df-8c7b-592c86ed2690",
					"title": "57331043_3066216873392179_6849887699365527552_n.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/70f83c9c-a86e-46df-8c7b-592c86ed2690/57331043_3066216873392179_6849887699365527552_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/70f83c9c-a86e-46df-8c7b-592c86ed2690/0/0.jpg"
			},
			{
					"uuid": "fe0bbf90-5f16-4b1b-b2d4-863651b4c802",
					"title": "D-Lo and Nets have come a long way",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/fe0bbf90-5f16-4b1b-b2d4-863651b4c802/57172186_2719216191429172_9131243759994929152_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/fe0bbf90-5f16-4b1b-b2d4-863651b4c802/0/0.jpg"
			},
			{
					"uuid": "b8d814c6-658f-4087-b806-cfe53606d4db",
					"title": "🚨 NBA PLAYOFFS ARE HERE 🚨",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/b8d814c6-658f-4087-b806-cfe53606d4db/57333340_752696565123901_3273380226242969600_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b8d814c6-658f-4087-b806-cfe53606d4db/0/0.jpg"
			},
			{
					"uuid": "40a961da-3edc-467d-b000-4546dd91a8ba",
					"title": "57500901_1355200534620377_3316774200684838912_n.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/40a961da-3edc-467d-b000-4546dd91a8ba/57500901_1355200534620377_3316774200684838912_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/40a961da-3edc-467d-b000-4546dd91a8ba/0/0.jpg"
			},
			{
					"uuid": "bfee9e2e-fb3c-4a0c-8cc7-f85d055bb260",
					"title": "Anything is possible in LA🔥\n\nB/R x @beatsbydre",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/bfee9e2e-fb3c-4a0c-8cc7-f85d055bb260/57033789_572457326586474_6015830193220878336_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/bfee9e2e-fb3c-4a0c-8cc7-f85d055bb260/0/0.jpg"
			},
			{
					"uuid": "2357eab7-8a4a-46fc-adf6-6874407f45ba",
					"title": "57308455_798127883888799_6037976947269566464_n.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/2357eab7-8a4a-46fc-adf6-6874407f45ba/57308455_798127883888799_6037976947269566464_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2357eab7-8a4a-46fc-adf6-6874407f45ba/0/0.jpg"
			},
			{
					"uuid": "9b882a11-8273-4911-a347-f6c4bbbb930c",
					"title": "56938028_2359930110918305_8744928068948197376_n.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/instagram/9b882a11-8273-4911-a347-f6c4bbbb930c/56938028_2359930110918305_8744928068948197376_n.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9b882a11-8273-4911-a347-f6c4bbbb930c/0/0.jpg"
			},
			{
					"uuid": "f79127e3-cc34-47f4-b91c-15d25b875004",
					"title": "f_jk3fgq0kWj3aDK.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f79127e3-cc34-47f4-b91c-15d25b875004/f_jk3fgq0kWj3aDK.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f79127e3-cc34-47f4-b91c-15d25b875004/0/0.jpg"
			},
			{
					"uuid": "7e505c24-af06-48be-ae3e-139581cf450f",
					"title": "wnsEHwgBzKGTbTKc.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/7e505c24-af06-48be-ae3e-139581cf450f/wnsEHwgBzKGTbTKc.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/7e505c24-af06-48be-ae3e-139581cf450f/0/0.jpg"
			},
			{
					"uuid": "6b28e46d-b3b8-465c-8f30-6f40e6aaf34c",
					"title": "\"I got it in, dad. D-Wade\" 😂\n\n2-year-old's form is on point (via anthonyantoniazzi/IG) https://t.co/lI1ieuiZyi",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/6b28e46d-b3b8-465c-8f30-6f40e6aaf34c/LA6E4lnotKyB58C6.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/6b28e46d-b3b8-465c-8f30-6f40e6aaf34c/0/0.jpg"
			},
			{
					"uuid": "1033ac60-ac45-4641-ba82-e9bd07ba8d60",
					"title": "RMUq2EcNwtfkaFm9.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/1033ac60-ac45-4641-ba82-e9bd07ba8d60/RMUq2EcNwtfkaFm9.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/1033ac60-ac45-4641-ba82-e9bd07ba8d60/0/0.jpg"
			},
			{
					"uuid": "baa04b67-cefa-4d1d-8fdd-2ac55e9fb858",
					"title": "JR’s secret stuff 😂 \n\nSpace Jam 2 trailer gets the NBA2K remix \n\n(via @Shady00018) https://t.co/5MOGRuULXY",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/baa04b67-cefa-4d1d-8fdd-2ac55e9fb858/5inLOmh5c1gh14nA.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/baa04b67-cefa-4d1d-8fdd-2ac55e9fb858/0/0.jpg"
			},
			{
					"uuid": "9be547b0-184f-4974-91ee-5661c6846093",
					"title": "hgCCxz4G8aJeDZyV.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9be547b0-184f-4974-91ee-5661c6846093/hgCCxz4G8aJeDZyV.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9be547b0-184f-4974-91ee-5661c6846093/0/0.jpg"
			},
			{
					"uuid": "2e28fb4d-3efa-490d-b990-22f8eed278bd",
					"title": "cfNyiphLYa3Yx6ox.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/2e28fb4d-3efa-490d-b990-22f8eed278bd/cfNyiphLYa3Yx6ox.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2e28fb4d-3efa-490d-b990-22f8eed278bd/0/0.jpg"
			},
			{
					"uuid": "40f5b1b6-d8c3-4cb1-be05-6795563a2bdf",
					"title": "qxS_zQcM80mxBliF.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/40f5b1b6-d8c3-4cb1-be05-6795563a2bdf/qxS_zQcM80mxBliF.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/40f5b1b6-d8c3-4cb1-be05-6795563a2bdf/0/0.jpg"
			},
			{
					"uuid": "78fbc8a2-4a4f-43b6-88c7-9b6367986b63",
					"title": "Ep0uuLf3Hh-gXTZF.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/78fbc8a2-4a4f-43b6-88c7-9b6367986b63/Ep0uuLf3Hh-gXTZF.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/78fbc8a2-4a4f-43b6-88c7-9b6367986b63/0/0.jpg"
			},
			{
					"uuid": "9083edc8-dcb3-4802-a552-419770cb0ee3",
					"title": "5M-hRfRieCPfwptI.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9083edc8-dcb3-4802-a552-419770cb0ee3/5M-hRfRieCPfwptI.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9083edc8-dcb3-4802-a552-419770cb0ee3/0/0.jpg"
			},
			{
					"uuid": "6e261516-2de4-421e-b58d-5846c9cc4c17",
					"title": "89kvo_KzOCYPI3yA.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/6e261516-2de4-421e-b58d-5846c9cc4c17/89kvo_KzOCYPI3yA.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/6e261516-2de4-421e-b58d-5846c9cc4c17/0/0.jpg"
			},
			{
					"uuid": "fbbd78f5-8a9a-4b84-bb69-7274d1de3998",
					"title": "mt_lAvZolBaRgLyK.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/fbbd78f5-8a9a-4b84-bb69-7274d1de3998/mt_lAvZolBaRgLyK.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/fbbd78f5-8a9a-4b84-bb69-7274d1de3998/0/0.jpg"
			},
			{
					"uuid": "3bd28a8f-9fd5-45f9-9c14-644c773604a3",
					"title": "XZOWGni-Ynlm-8SB.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/3bd28a8f-9fd5-45f9-9c14-644c773604a3/XZOWGni-Ynlm-8SB.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/3bd28a8f-9fd5-45f9-9c14-644c773604a3/0/0.jpg"
			},
			{
					"uuid": "f91c23a4-c94d-4fd8-8ca7-26d5207284f5",
					"title": "AKg-tGV4WCn3XnXn.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f91c23a4-c94d-4fd8-8ca7-26d5207284f5/AKg-tGV4WCn3XnXn.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f91c23a4-c94d-4fd8-8ca7-26d5207284f5/0/0.jpg"
			},
			{
					"uuid": "f846b8cb-8879-4a4c-92d7-3bfce438ec75",
					"title": "ivARkl4HGV1nur49.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f846b8cb-8879-4a4c-92d7-3bfce438ec75/ivARkl4HGV1nur49.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f846b8cb-8879-4a4c-92d7-3bfce438ec75/0/0.jpg"
			},
			{
					"uuid": "f40b503f-1a7a-478f-ba26-8e73b7b79a94",
					"title": "x_sfWZ6ins4AzJcy.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f40b503f-1a7a-478f-ba26-8e73b7b79a94/x_sfWZ6ins4AzJcy.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f40b503f-1a7a-478f-ba26-8e73b7b79a94/0/0.jpg"
			},
			{
					"uuid": "44b229ff-d4ac-4139-b434-cf47d25e2860",
					"title": "ax_6FqCcaUPIy6BX.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/44b229ff-d4ac-4139-b434-cf47d25e2860/ax_6FqCcaUPIy6BX.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/44b229ff-d4ac-4139-b434-cf47d25e2860/0/0.jpg"
			},
			{
					"uuid": "203d61c6-662f-4640-a983-215a16941de8",
					"title": "4rnZAD5thpp6Z9hj.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/203d61c6-662f-4640-a983-215a16941de8/4rnZAD5thpp6Z9hj.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/203d61c6-662f-4640-a983-215a16941de8/0/0.jpg"
			},
			{
					"uuid": "9727399d-1784-4be0-b7da-4ead4e4d28a0",
					"title": "1V3KZ_MXDq4QnRVx.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9727399d-1784-4be0-b7da-4ead4e4d28a0/1V3KZ_MXDq4QnRVx.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9727399d-1784-4be0-b7da-4ead4e4d28a0/0/0.jpg"
			},
			{
					"uuid": "e750e668-be5d-4ebd-b093-88105fe654d1",
					"title": "ij1qN2-lkMyUBu3s.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e750e668-be5d-4ebd-b093-88105fe654d1/ij1qN2-lkMyUBu3s.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e750e668-be5d-4ebd-b093-88105fe654d1/0/0.jpg"
			},
			{
					"uuid": "7099b43c-cc86-42a4-863e-0db16d84fa3b",
					"title": "wkCy5oWUZdagII1B.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/7099b43c-cc86-42a4-863e-0db16d84fa3b/wkCy5oWUZdagII1B.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/7099b43c-cc86-42a4-863e-0db16d84fa3b/0/0.jpg"
			},
			{
					"uuid": "333033a6-d3af-4426-b0ba-c75f58c1d0a9",
					"title": "Tl5_GqooB-rnLwQn.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/333033a6-d3af-4426-b0ba-c75f58c1d0a9/Tl5_GqooB-rnLwQn.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/333033a6-d3af-4426-b0ba-c75f58c1d0a9/0/0.jpg"
			},
			{
					"uuid": "6fa6d67a-4057-4edb-a371-d77ac0ecb189",
					"title": "XA8_Yo7_rf_danDY.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/6fa6d67a-4057-4edb-a371-d77ac0ecb189/XA8_Yo7_rf_danDY.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/6fa6d67a-4057-4edb-a371-d77ac0ecb189/0/0.jpg"
			},
			{
					"uuid": "0b41a6ed-5642-4809-8189-96299a373893",
					"title": "N29gIpVq4r7IyA_a.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/0b41a6ed-5642-4809-8189-96299a373893/N29gIpVq4r7IyA_a.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/0b41a6ed-5642-4809-8189-96299a373893/0/0.jpg"
			},
			{
					"uuid": "0c42a13a-0b8d-494e-bd29-4a28b0f8d74d",
					"title": "Heat fans really started a \"Paul Pierce sucks\" chant in Dwyane Wade's last home game https://t.co/gXT7rBda4v",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/0c42a13a-0b8d-494e-bd29-4a28b0f8d74d/4M2fxqC9yRUnjAJn.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/0c42a13a-0b8d-494e-bd29-4a28b0f8d74d/0/0.jpg"
			},
			{
					"uuid": "b6bab22a-e82c-45f7-a7fc-664d967d1c19",
					"title": "5w9qGYJ3krJT9eee.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/b6bab22a-e82c-45f7-a7fc-664d967d1c19/5w9qGYJ3krJT9eee.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b6bab22a-e82c-45f7-a7fc-664d967d1c19/0/0.jpg"
			},
			{
					"uuid": "763de062-6059-48b8-ad4d-f1436e9412f3",
					"title": "Magic walking into Staples Center 😂 https://t.co/EpGaLgu65n",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/763de062-6059-48b8-ad4d-f1436e9412f3/mQA8VzVd9OP9b4oN.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/763de062-6059-48b8-ad4d-f1436e9412f3/0/0.jpg"
			},
			{
					"uuid": "0c5971d7-e5a0-4553-a9ca-f34e042a6043",
					"title": "pl8WOXdvT0gqkMug.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/0c5971d7-e5a0-4553-a9ca-f34e042a6043/pl8WOXdvT0gqkMug.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/0c5971d7-e5a0-4553-a9ca-f34e042a6043/0/0.jpg"
			},
			{
					"uuid": "137fc2e7-2bce-4a5a-850d-39e412cf496d",
					"title": "bZXd4O7y-1t370Qs.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/137fc2e7-2bce-4a5a-850d-39e412cf496d/bZXd4O7y-1t370Qs.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/137fc2e7-2bce-4a5a-850d-39e412cf496d/0/0.jpg"
			},
			{
					"uuid": "b9009ef1-a4f6-4648-a7e9-aa48b28b518c",
					"title": "KzFtumqd_czsYlT5.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/b9009ef1-a4f6-4648-a7e9-aa48b28b518c/KzFtumqd_czsYlT5.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b9009ef1-a4f6-4648-a7e9-aa48b28b518c/0/0.jpg"
			},
			{
					"uuid": "9aa5a8b5-d4b1-434a-a50b-87696611580a",
					"title": "CkR-Fdw54dpDJVhR.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9aa5a8b5-d4b1-434a-a50b-87696611580a/CkR-Fdw54dpDJVhR.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9aa5a8b5-d4b1-434a-a50b-87696611580a/0/0.jpg"
			},
			{
					"uuid": "a4d1f9e4-879e-4960-ba12-3239d9f45580",
					"title": "HGOsZpdfoUi0Pq8F.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/a4d1f9e4-879e-4960-ba12-3239d9f45580/HGOsZpdfoUi0Pq8F.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a4d1f9e4-879e-4960-ba12-3239d9f45580/0/0.jpg"
			},
			{
					"uuid": "563672ad-6ec0-4cd2-9d6b-bcc509406d36",
					"title": "POmuUe8gELpvapnJ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/563672ad-6ec0-4cd2-9d6b-bcc509406d36/POmuUe8gELpvapnJ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/563672ad-6ec0-4cd2-9d6b-bcc509406d36/0/0.jpg"
			},
			{
					"uuid": "82c3e07e-faa9-4f6b-a877-34379889da96",
					"title": "Z77zQmZouyKCpQTZ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/82c3e07e-faa9-4f6b-a877-34379889da96/Z77zQmZouyKCpQTZ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/82c3e07e-faa9-4f6b-a877-34379889da96/0/0.jpg"
			},
			{
					"uuid": "865ed8ad-e008-4c9a-bde5-49d89887c6fc",
					"title": "0-KKtVP6DqcSmqsj.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/865ed8ad-e008-4c9a-bde5-49d89887c6fc/0-KKtVP6DqcSmqsj.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/865ed8ad-e008-4c9a-bde5-49d89887c6fc/0/0.jpg"
			},
			{
					"uuid": "d453d931-8c8e-4855-b6ea-6871694def99",
					"title": "4KLecajrgBHb8WLd.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d453d931-8c8e-4855-b6ea-6871694def99/4KLecajrgBHb8WLd.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d453d931-8c8e-4855-b6ea-6871694def99/0/0.jpg"
			},
			{
					"uuid": "d1e1d7b2-81c2-4fd0-95ba-422ca6be421e",
					"title": "I3bny_HJbwGodid5.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d1e1d7b2-81c2-4fd0-95ba-422ca6be421e/I3bny_HJbwGodid5.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d1e1d7b2-81c2-4fd0-95ba-422ca6be421e/0/0.jpg"
			},
			{
					"uuid": "948b1672-919d-4e13-8c98-f17ff74db3c4",
					"title": "6xgfZTQkfL_llobW.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/948b1672-919d-4e13-8c98-f17ff74db3c4/6xgfZTQkfL_llobW.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/948b1672-919d-4e13-8c98-f17ff74db3c4/0/0.jpg"
			},
			{
					"uuid": "06f561bd-eadd-4d1c-86d9-354efb77ca31",
					"title": "NI5ryhr1j9e2BkWz.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/06f561bd-eadd-4d1c-86d9-354efb77ca31/NI5ryhr1j9e2BkWz.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/06f561bd-eadd-4d1c-86d9-354efb77ca31/0/0.jpg"
			},
			{
					"uuid": "74d3cec4-4f4f-4327-a577-afd6b5df6bc1",
					"title": "D-Wade arrives in an all-red suit for his last regular season game in Miami 🙌\n\n#OneLastDance (via @NBA) \nhttps://t.co/tLfAIyN7AL",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/74d3cec4-4f4f-4327-a577-afd6b5df6bc1/jJECbWjzcNadhzpg.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/74d3cec4-4f4f-4327-a577-afd6b5df6bc1/0/0.jpg"
			},
			{
					"uuid": "256561f9-ee79-4a99-854a-05965d9e051c",
					"title": "eEJUURu6VbI1qBYT.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/256561f9-ee79-4a99-854a-05965d9e051c/eEJUURu6VbI1qBYT.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/256561f9-ee79-4a99-854a-05965d9e051c/0/0.jpg"
			},
			{
					"uuid": "ea4b3437-07f7-4557-8a28-0a0d15e3627c",
					"title": "E0gMNOdnJPJ-CZm7.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/ea4b3437-07f7-4557-8a28-0a0d15e3627c/E0gMNOdnJPJ-CZm7.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/ea4b3437-07f7-4557-8a28-0a0d15e3627c/0/0.jpg"
			},
			{
					"uuid": "2a8a2426-87ef-4240-9f99-a4c7d7929e4d",
					"title": "D-Wade to Bron off glass.\nTrae turning defenders around. \nRuss getting fancy on the break.\n\nBest assists of the year. (@mcdonalds) https://t.co/g0BrPWfA1i",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/2a8a2426-87ef-4240-9f99-a4c7d7929e4d/IhwDfPoXL8-QlYAM.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/2a8a2426-87ef-4240-9f99-a4c7d7929e4d/0/0.jpg"
			},
			{
					"uuid": "bacf4557-7e86-408c-8d38-b0babd1424f0",
					"title": "EPh7vwuw7_yWhys_.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/bacf4557-7e86-408c-8d38-b0babd1424f0/EPh7vwuw7_yWhys_.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/bacf4557-7e86-408c-8d38-b0babd1424f0/0/0.jpg"
			},
			{
					"uuid": "a91ab148-c58f-4d19-8ca1-c7b17b6b4cd6",
					"title": "eaoGa7rZv03IjGQT.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/a91ab148-c58f-4d19-8ca1-c7b17b6b4cd6/eaoGa7rZv03IjGQT.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a91ab148-c58f-4d19-8ca1-c7b17b6b4cd6/0/0.jpg"
			},
			{
					"uuid": "de661e72-a9b1-478b-a50a-c054a4aa9a51",
					"title": "xMKgj20jB5WrMfYi.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/de661e72-a9b1-478b-a50a-c054a4aa9a51/xMKgj20jB5WrMfYi.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/de661e72-a9b1-478b-a50a-c054a4aa9a51/0/0.jpg"
			},
			{
					"uuid": "37019fc8-0f4c-4300-bfc3-59a21d808471",
					"title": "dVzhUwInDl3wQp6s.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/37019fc8-0f4c-4300-bfc3-59a21d808471/dVzhUwInDl3wQp6s.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/37019fc8-0f4c-4300-bfc3-59a21d808471/0/0.jpg"
			},
			{
					"uuid": "d586c4ae-ae7e-46b6-9545-68d683beba5d",
					"title": "OYIyV-bIZFX1Tk2H.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/d586c4ae-ae7e-46b6-9545-68d683beba5d/OYIyV-bIZFX1Tk2H.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/d586c4ae-ae7e-46b6-9545-68d683beba5d/0/0.jpg"
			},
			{
					"uuid": "3b66300a-50a0-4051-9b69-71142430fe6d",
					"title": "pw02QKswiDQoZC5i.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/3b66300a-50a0-4051-9b69-71142430fe6d/pw02QKswiDQoZC5i.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/3b66300a-50a0-4051-9b69-71142430fe6d/0/0.jpg"
			},
			{
					"uuid": "b4a24f82-0480-42ae-bdb9-295041539021",
					"title": "-iKssDpHphyJINlG.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/b4a24f82-0480-42ae-bdb9-295041539021/-iKssDpHphyJINlG.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b4a24f82-0480-42ae-bdb9-295041539021/0/0.jpg"
			},
			{
					"uuid": "57c7d6a2-6776-4d47-a4c5-2f348075c664",
					"title": "wWVSrXhxRn3G1Y6v.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/57c7d6a2-6776-4d47-a4c5-2f348075c664/wWVSrXhxRn3G1Y6v.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/57c7d6a2-6776-4d47-a4c5-2f348075c664/0/0.jpg"
			},
			{
					"uuid": "c691f564-1d8d-423f-ab64-d0331ba68acf",
					"title": "L0aXO82FRy_ahwiz.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/c691f564-1d8d-423f-ab64-d0331ba68acf/L0aXO82FRy_ahwiz.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/c691f564-1d8d-423f-ab64-d0331ba68acf/0/0.jpg"
			},
			{
					"uuid": "7266c9d4-0b94-43c6-a27e-8397c31d3ba2",
					"title": "2JZsU7_Ng51MOhtJ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/7266c9d4-0b94-43c6-a27e-8397c31d3ba2/2JZsU7_Ng51MOhtJ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/7266c9d4-0b94-43c6-a27e-8397c31d3ba2/0/0.jpg"
			},
			{
					"uuid": "e74594d6-87f7-4d71-9280-d8a496849bf1",
					"title": "e5DE5Ln2Qh7nRJhZ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e74594d6-87f7-4d71-9280-d8a496849bf1/e5DE5Ln2Qh7nRJhZ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e74594d6-87f7-4d71-9280-d8a496849bf1/0/0.jpg"
			},
			{
					"uuid": "b8e99989-1d89-438d-af96-6e3880eac563",
					"title": "7S2fQMnpUeQdcU7q.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/b8e99989-1d89-438d-af96-6e3880eac563/7S2fQMnpUeQdcU7q.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b8e99989-1d89-438d-af96-6e3880eac563/0/0.jpg"
			},
			{
					"uuid": "1be0a580-560e-448f-9b5e-b250eddee540",
					"title": "nBmaWIw4IDV1czoU.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/1be0a580-560e-448f-9b5e-b250eddee540/nBmaWIw4IDV1czoU.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/1be0a580-560e-448f-9b5e-b250eddee540/0/0.jpg"
			},
			{
					"uuid": "be1d7201-b9b0-477f-bca1-017a4a651aa5",
					"title": "DjaMDmn1tLp6M9WJ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/be1d7201-b9b0-477f-bca1-017a4a651aa5/DjaMDmn1tLp6M9WJ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/be1d7201-b9b0-477f-bca1-017a4a651aa5/0/0.jpg"
			},
			{
					"uuid": "9b1d6d98-25a1-4b64-b63d-60110a74ce9d",
					"title": "O-D8HJ1mmhjxuODw.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9b1d6d98-25a1-4b64-b63d-60110a74ce9d/O-D8HJ1mmhjxuODw.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9b1d6d98-25a1-4b64-b63d-60110a74ce9d/0/0.jpg"
			},
			{
					"uuid": "4062b81e-3cd8-461e-a5ab-305ffa1e6288",
					"title": "W4r3g0R7OwJX6fbp.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/4062b81e-3cd8-461e-a5ab-305ffa1e6288/W4r3g0R7OwJX6fbp.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/4062b81e-3cd8-461e-a5ab-305ffa1e6288/0/0.jpg"
			},
			{
					"uuid": "aef7d782-ba17-43d1-a9cf-0ddbae4de38a",
					"title": "MOt0Q1fCwZv4dmAH.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/aef7d782-ba17-43d1-a9cf-0ddbae4de38a/MOt0Q1fCwZv4dmAH.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/aef7d782-ba17-43d1-a9cf-0ddbae4de38a/0/0.jpg"
			},
			{
					"uuid": "676ae662-3140-43f8-9384-9bfd4cf8c45a",
					"title": "lFt6irOfy1qoG8-a.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/676ae662-3140-43f8-9384-9bfd4cf8c45a/lFt6irOfy1qoG8-a.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/676ae662-3140-43f8-9384-9bfd4cf8c45a/0/0.jpg"
			},
			{
					"uuid": "a6dc0e6d-985c-46ce-bf50-0e415c8e7e91",
					"title": "WvTekYxWKBqhzwMp.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/a6dc0e6d-985c-46ce-bf50-0e415c8e7e91/WvTekYxWKBqhzwMp.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a6dc0e6d-985c-46ce-bf50-0e415c8e7e91/0/0.jpg"
			},
			{
					"uuid": "eccc0a73-9a85-46e3-89cd-6c5a5b1963e5",
					"title": "xBZqi6BTg9wWrRUz.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/eccc0a73-9a85-46e3-89cd-6c5a5b1963e5/xBZqi6BTg9wWrRUz.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/eccc0a73-9a85-46e3-89cd-6c5a5b1963e5/0/0.jpg"
			},
			{
					"uuid": "4ea2cca4-b494-421a-a5dc-93fc6292dcf2",
					"title": "mhPen0AHO5dzqz5B.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/4ea2cca4-b494-421a-a5dc-93fc6292dcf2/mhPen0AHO5dzqz5B.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/4ea2cca4-b494-421a-a5dc-93fc6292dcf2/0/0.jpg"
			},
			{
					"uuid": "35186312-a48a-4478-942b-6b125a529730",
					"title": "M4BbrxArzDsoHa8P.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/35186312-a48a-4478-942b-6b125a529730/M4BbrxArzDsoHa8P.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/35186312-a48a-4478-942b-6b125a529730/0/0.jpg"
			},
			{
					"uuid": "b68b8fd9-c86c-4d66-9151-e1be7abd0ff2",
					"title": "3P3Q221v1s2Nj4uo.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/b68b8fd9-c86c-4d66-9151-e1be7abd0ff2/3P3Q221v1s2Nj4uo.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/b68b8fd9-c86c-4d66-9151-e1be7abd0ff2/0/0.jpg"
			},
			{
					"uuid": "6c77b86b-c1be-44b5-a7a0-cf060ca3cecd",
					"title": "TOFjdUIuuLLs0mLk.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/6c77b86b-c1be-44b5-a7a0-cf060ca3cecd/TOFjdUIuuLLs0mLk.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/6c77b86b-c1be-44b5-a7a0-cf060ca3cecd/0/0.jpg"
			},
			{
					"uuid": "c7bcb099-0564-4193-92e3-cbe6bb2b9c3e",
					"title": "lgRMOdck-TAnHqVt.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/c7bcb099-0564-4193-92e3-cbe6bb2b9c3e/lgRMOdck-TAnHqVt.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/c7bcb099-0564-4193-92e3-cbe6bb2b9c3e/0/0.jpg"
			},
			{
					"uuid": "a68c9a98-a407-4edb-9984-3d140fa84f2e",
					"title": "L2K4YOUD1V6_RlxU.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/a68c9a98-a407-4edb-9984-3d140fa84f2e/L2K4YOUD1V6_RlxU.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a68c9a98-a407-4edb-9984-3d140fa84f2e/0/0.jpg"
			},
			{
					"uuid": "e14c866d-0d7c-4665-b8e9-283219d8631e",
					"title": "H6MMq5AwjtM3dTeE.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e14c866d-0d7c-4665-b8e9-283219d8631e/H6MMq5AwjtM3dTeE.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e14c866d-0d7c-4665-b8e9-283219d8631e/0/0.jpg"
			},
			{
					"uuid": "9350ad87-f30a-46f2-96f5-4f4a9bfd3b6e",
					"title": "In9aECoHDp9E6Knt.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/9350ad87-f30a-46f2-96f5-4f4a9bfd3b6e/In9aECoHDp9E6Knt.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/9350ad87-f30a-46f2-96f5-4f4a9bfd3b6e/0/0.jpg"
			},
			{
					"uuid": "f36e8514-abb5-427e-9ffb-34e5aa42103e",
					"title": "lOHo8vCNdRM2k2rO.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/f36e8514-abb5-427e-9ffb-34e5aa42103e/lOHo8vCNdRM2k2rO.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/f36e8514-abb5-427e-9ffb-34e5aa42103e/0/0.jpg"
			},
			{
					"uuid": "a9562f12-8ad0-4b9d-8ab4-99347cdc5689",
					"title": "His daughter was visiting from Mexico to watch him play.\n\nSo when he scored, he got to celebrate with her in the stands ❤️ (via @USLChampionship) https://t.co/5OwnM7xLCh",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/a9562f12-8ad0-4b9d-8ab4-99347cdc5689/sJIeemTiY79hCorT.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/a9562f12-8ad0-4b9d-8ab4-99347cdc5689/0/0.jpg"
			},
			{
					"uuid": "7de61a9d-2327-4051-ae9e-8a8204c8caf9",
					"title": "4QSpkOb7qeLR6Lpa.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/7de61a9d-2327-4051-ae9e-8a8204c8caf9/4QSpkOb7qeLR6Lpa.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/7de61a9d-2327-4051-ae9e-8a8204c8caf9/0/0.jpg"
			},
			{
					"uuid": "29392189-30ee-4b59-b2f5-d3ad840cb918",
					"title": "C1U30d1mCU-52GBR.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/29392189-30ee-4b59-b2f5-d3ad840cb918/C1U30d1mCU-52GBR.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/29392189-30ee-4b59-b2f5-d3ad840cb918/0/0.jpg"
			},
			{
					"uuid": "80eaaa06-67a9-4a19-b728-593413f4ccc3",
					"title": "fdUjo6U1FEHy1G2L.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/80eaaa06-67a9-4a19-b728-593413f4ccc3/fdUjo6U1FEHy1G2L.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/80eaaa06-67a9-4a19-b728-593413f4ccc3/0/0.jpg"
			},
			{
					"uuid": "07d80003-38ed-4717-89ef-e29ab39d9455",
					"title": "nGeOhx6F2HGOpXqR.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/07d80003-38ed-4717-89ef-e29ab39d9455/nGeOhx6F2HGOpXqR.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/07d80003-38ed-4717-89ef-e29ab39d9455/0/0.jpg"
			},
			{
					"uuid": "e2022537-4a78-4d6b-a0a3-c1038ed764ae",
					"title": "jsPMo6EBewN9lkVJ.mp4",
					"fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/twitter/e2022537-4a78-4d6b-a0a3-c1038ed764ae/jsPMo6EBewN9lkVJ.mp4",
					"platform": null,
					"thumbNail": "lumiere/d65aa957-d094-4cf3-8d37-dafe50e752ea/e2022537-4a78-4d6b-a0a3-c1038ed764ae/0/0.jpg"
			}
	],
	"pagination": {}
}
