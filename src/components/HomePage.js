const HomePage = () => {
   return (
      <>
         <br />
         <b>Yêu cầu:</b>
         <br />
         <ul>
            <li>
               Sử dụng API từ trang web{" "}
               <a href="https://reqres.in/">https://reqres.in/</a> để tạo
               website.
            </li>
            <li>
               Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm
               các chức năng:
               <ol>
                  <li>Đăng nhập</li>
                  <li>Thêm User</li>
                  <li>Sửa User</li>
                  <li>Xoá User</li>
                  <li>Hiển thị tất cả các User</li>
                  <li>Tìm kiếm User theo Id</li>
                  <li>Sắp xếp theo FirstName</li>
                  <li>Import User từ file .csv</li>
                  <li>Export User ra file .csv</li>
               </ol>
            </li>
         </ul>

         <ul>
            <li>
               {" "}
               Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học
               và đẹp.
            </li>
            <li>Commit và đẩy source code lên github public.</li>
            <li>Triển khai website lên Heroku để demo.</li>
         </ul>
         <span>Yêu cầu backend (optional - không bắt buộc):</span>
         <br />
         <div>
            Sử dụng các api như trên trang web:{" "}
            <a href="https://reqres.in/">https://reqres.in/</a>
         </div>
      </>
   );
};

export default HomePage;
