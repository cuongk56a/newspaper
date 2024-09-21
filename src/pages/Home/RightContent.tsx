import { useNavigate } from 'react-router-dom';
import {dataVietNamNet} from '../../assets/data/data-vietnamnet.ts';

const RightContent = () => {
  const nav = useNavigate()
  return (
    <div>
      <div className="border-b-2 h-[170px] w-full flex gap-6 pb-4">
        <div className="w-[35%]">
          <img
            className="h-full w-full object-fill radis rounded cursor-pointer"
            src="data:image/jpeg;base64,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"
            alt=""
            onClick={()=>{nav('/post-detail')}}
          />
        </div>
        <div className="w-[65%]">
          <h1 className="font-medium line-clamp-1 text-[25px] cursor-pointer"  onClick={()=>{nav('/post-detail')}}>
            Tiếp Bình Định trên sân nhà, Hà Nội FC quyết tâm giành trọn 3 điểm
            trong trận ra quân tại LPBank V-League 2024/25.\nDù vậy, đội chủ nhà
            gặp rất nhiều khó khăn trước hàng phòng ngự được tổ chức tốt của đối
            thủ.\nHà Nội FC gặp bế tắc trong phần lớn thời gian của trận
            đấu.\nCác tân binh của Hà Nội FC thích nghi nhanh nhưng vẫn chưa thể
            hiện tốt như kỳ vọng.\nTrong một thế trận bế tắc, Văn Quyết là điểm
            sáng của đội chủ sân Hàng Đẫy.\nThủ quân Hà Nội FC thi đấu rất nỗ
            lực, có mặt ở những điểm "nóng" trên sân.\nPhút 83, đón đường chuyền
            của đồng đội, Văn Quyết tung cú dứt điểm từ ngoài vòng cấm, bóng đi
            chìm đánh bại Tuấn Linh.\nVăn Quyết ghi bàn thắng duy nhất của trận
            đấu.\nAnh khẳng định giá trị của mình ngay trận đầu tại V-League
            2024/25.\nĐây là trận đấu mà HLV Kim Sang Sik dự khán. Tuyển Việt
            Nam đang rất khát tiền đạo giỏi, và liệu chiến lược gia người Hàn
            Quốc có trao cơ hội cho Văn Quyết trong đợt tập trung vào tháng 10
            tới?\nSau trận đấu, HLV Quang Huy của Bình Định cho rằng trọng tài
            đã không dùng VAR để kiểm tra tình huống mà Văn Quyết ghi bàn. Theo
            HLV này, trước đó cầu thủ Hà Nội FC có tình huống phạm lỗi với cầu
            thủ Bình Định.
          </h1>
          <p className="text-[15px] line-clamp-3 pt-2">
            Tuy nhiên, nhiều phóng viên có mặt tại Ukraine khẳng định đã thấy
            nhiều tù nhân chiến tranh Nga được đưa lên một chiếc xe buýt gần
            biên giới Ukraine - Belarus một lúc trước khi đoàn tù nhân Ukraine
            băng qua biên giới về nước. Từ khi Ukraine mở cuộc tiến công Nga đến
            nay, đây là vụ trao đổi tù nhân thứ hai giữa hai nước
          </p>
        </div>
      </div>
      <div className="justify-center items-center grid grid-cols-3 gap-6 h-full pt-4">
        {dataVietNamNet.slice(0,3).map((data, index)=>{
          return (
            <div key={index} className='cursor-pointer'  onClick={()=>{nav('/post-detail')}}>
              <a>
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="w-full h-[170px] object-fill rounded pb-4"
                />
                <p className="text-black line-clamp-2 font-bold">{data.excerpt}
                </p>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RightContent;
