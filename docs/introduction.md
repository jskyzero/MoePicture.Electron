# Introducitin
`jskyzero` `2019/02/09`

## Reference

```csharp
private const string User_Agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit / 537.36(KHTML, like Gecko) Chrome  47.0.2526.106 Safari / 537.36";

client.DefaultRequestHeaders.Add("User-Agent", User_Agent);
```
```csharp
using MoePicture.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Windows.Foundation;

namespace MoePicture.Services
{
    /// <summary>
    /// 枚举网站种类
    /// </summary>
    public enum WebsiteType { Yande, Konachan, Danbooru, Gelbooru, Safebooru };

    public class WebsiteHelper
    {

        /// <summary> url table </summary>
        static Dictionary<WebsiteType, string> UrlDict = new Dictionary<WebsiteType, string>
        {
            {WebsiteType.Yande, "https://yande.re/post.xml?limit=100"} ,
            {WebsiteType.Konachan, "http://konachan.com/post.xml?limit=100"},
            {WebsiteType.Danbooru, "https://danbooru.donmai.us/posts.xml?limit=100"},
            {WebsiteType.Gelbooru, "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100"},
            {WebsiteType.Safebooru, "http://safebooru.org/index.php?page=dapi&s=post&q=index&limit=100"},
        };

        // Safebooru can't find website now
        // https://chan.sankakucomplex.com/post/index.xml 403 Forbidden
        // https://idol.sankakucomplex.com/post/index.xml 403 Forbidden
        // Behoimi I don't like add cosplay site


        /// <summary> 网站类型 </summary>
        private WebsiteType websiteType;
        /// <summary> 标签 </summary>
        private string searchTag;
        /// <summary> 页码 </summary>
        private int pageNum;

        /// <summary> 页码 </summary>
        public WebsiteType Type { get => websiteType; set => websiteType = value; }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="websiteType">网站类型</param>
        /// <param name="tag">搜索标签</param>
        public WebsiteHelper(WebsiteType websiteType, string tag)
        {
            pageNum = 1;
            Type = websiteType;

            switch (Type)
            {
                default:
                    searchTag = tag == "" ? "" : "&tags=" + tag;
                    break;
            }
        }
        /// <summary>
        /// 获取每次的链接
        /// </summary>
        /// <returns></returns>
        public string Url()
        {
            string url = "";

            switch (Type)
            {
                case WebsiteType.Yande:
                case WebsiteType.Konachan:
                case WebsiteType.Danbooru:
                    url = UrlDict[Type] + "&page=" + pageNum.ToString() + searchTag;
                    break;
                case WebsiteType.Gelbooru:
                case WebsiteType.Safebooru:
                    url = UrlDict[Type] + "&pid=" + pageNum.ToString() + searchTag;
                    break;

            }

            pageNum++;

            return url;
        }

        /// <summary>
        /// 帮助设置图片信息
        /// </summary>
        /// <param name="item"></param>
        /// <param name="node"></param>
        /// <param name="websiteType"></param>
        public static void SetInfoFromNode(PictureItem item, XmlNode node, WebsiteType websiteType)
        {
            switch (websiteType)
            {
                case WebsiteType.Yande:
                case WebsiteType.Konachan:
                    Yande(item, node);
                    break;
                case WebsiteType.Danbooru:
                    Danbooru(item, node);
                    break;
                case WebsiteType.Gelbooru:
                    Gelbooru(item, node);
                    break;
                case WebsiteType.Safebooru:
                    Safebooru(item, node);
                    break;
                default:
                    item.IsAllRight = false;
                    break;
            }
        }

        public static void Yande(PictureItem item, XmlNode node)
        {
            try
            {
                // 从节点得到图片信息
                item.Id = node.Attributes["id"].Value;
                item.Tags = node.Attributes["tags"].Value;
                item.PreviewUrl = node.Attributes["preview_url"].Value;
                item.SampleUrl = node.Attributes["sample_url"].Value;
                item.SourceUrl = node.Attributes["jpeg_url"].Value;
                item.IsSafe = node.Attributes["rating"].Value == "s";
                item.PreviewSize = new Size(int.Parse(node.Attributes["preview_width"].Value), 
                                            int.Parse(node.Attributes["preview_height"].Value));
                // 通过url处理得到两种name
                item.Title = Spider.GetFileNameFromUrl(item.SourceUrl);
                item.FileName = Spider.GetFileNameFromUrl(item.PreviewUrl);

            }
            catch(Exception e)
            {
                item.IsAllRight = false;
            }
        }

        public static void Gelbooru(PictureItem item, XmlNode node)
        {
            try
            {
                // 从节点得到图片信息
                item.Id = node.Attributes["id"].Value;
                item.Tags = node.Attributes["tags"].Value;
                item.PreviewUrl = node.Attributes["preview_url"].Value;
                item.SampleUrl = node.Attributes["sample_url"].Value;
                item.SourceUrl = node.Attributes["file_url"].Value;
                //item.PreviewUrl = item.SampleUrl;
                item.IsSafe = node.Attributes["rating"].Value == "s";
                item.PreviewSize = new Size(int.Parse(node.Attributes["preview_width"].Value),
                                            int.Parse(node.Attributes["preview_height"].Value));
                // 通过url处理得到两种name
                item.Title = Spider.GetFileNameFromUrl(item.SourceUrl);
                item.FileName = Spider.GetFileNameFromUrl(item.PreviewUrl);
            }
            catch(Exception e)
            {
                item.IsAllRight = false;
            }
        }

        public static void Safebooru(PictureItem item, XmlNode node)
        {
            try
            {
                // 从节点得到图片信息
                item.Id = node.Attributes["tags"].Value;
                item.Tags = node.Attributes["tags"].Value;
                item.PreviewUrl = "http:" + node.Attributes["preview_url"].Value;
                item.SampleUrl = "http:" + node.Attributes["sample_url"].Value;
                item.SourceUrl = "http:" + node.Attributes["file_url"].Value;
                //item.PreviewUrl = item.SampleUrl;
                item.IsSafe = node.Attributes["rating"].Value == "s";
                item.PreviewSize = new Size(int.Parse(node.Attributes["preview_width"].Value),
                                            int.Parse(node.Attributes["preview_height"].Value));
                // 通过url处理得到两种name
                item.Title = Spider.GetFileNameFromUrl(item.SourceUrl);
                item.FileName = Spider.GetFileNameFromUrl(item.PreviewUrl);
            }
            catch(Exception e)
            {
                item.IsAllRight = false;
            }
        }

        public static void Danbooru(PictureItem item, XmlNode node)
        {
            try
            {
                // 从节点得到图片信息
                item.Id = node["id"].InnerText;
                item.Tags = node["tag-string-general"].InnerText;
                item.PreviewUrl = node["preview-file-url"].InnerText;
                item.SampleUrl = node["file-url"].InnerText;
                item.SourceUrl = node["large-file-url"].InnerText;
                //item.PreviewUrl = item.SampleUrl;
                item.IsSafe = node["rating"].InnerText == "s";
                item.PreviewSize = new Size(int.Parse(node["image-width"].InnerText),
                                            int.Parse(node["image-height"].InnerText));
                // 通过url处理得到两种name
                item.Title = Spider.GetFileNameFromUrl(item.SourceUrl);
                item.FileName = Spider.GetFileNameFromUrl(item.PreviewUrl);

            }
            catch(Exception e)
            {
                item.IsAllRight = false;
            }

        }
    }
}
```
```csharp
using CommonServiceLocator;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Threading;
using MoePicture.Services;
using MoePicture.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using Windows.Foundation;
using Windows.Storage;
using Windows.Storage.AccessCache;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Media.Imaging;

namespace MoePicture.Models
{
    /// <summary>
    /// 枚举Uri种类
    /// 预览链接、示例图链接，原图链接。
    /// </summary>
    public enum UrlType { PreviewUrl, SampleUrl, SourceUrl };

    /// <summary>
    /// 图片Model类，用于储存图片的各种信息
    /// </summary>
    public class PictureItem : ObservableObject
    {
        #region Properties

        /// <summary> 弱引用对象，用于存储下载好的图片对象 </summary>
        private WeakReference bitmapImage;

        /// <summary> 链接种类 </summary>
        private UrlType urlType;
        /// <summary> 网站类型 </summary>
        private WebsiteType websiteType;
        /// <summary> 图片是否合规 </summary>
        private bool isSafe = false;
        /// <summary> 处理图片过程中是否无错误发生 </summary>
        private bool isAllRight = true;

        /// <summary> 标识id </summary>
        public string Id { get; set; }
        /// <summary> 标签 </summary>
        public string Tags { get; set; }
        /// <summary> 预览链接 </summary>
        public string PreviewUrl { get; set; }
        /// <summary> 样本链接 </summary>
        public string SampleUrl { get; set; }
        /// <summary> 原图链接 </summary>
        public string SourceUrl { get; set; }
        /// <summary> 文件保存名字 </summary>
        public string FileName { get; set; }
        /// <summary> 显示标题 </summary>
        public string Title { get; set; }
        /// <summary> 图片是否安全 </summary>
        public bool IsSafe { get => isSafe; set => isSafe = value; }
        /// <summary> 处理图片过程种是否顺利 </summary>
        public bool IsAllRight { get => isAllRight; set => isAllRight = value; }
        /// <summary> 网站类型 </summary>
        public WebsiteType Type { get => websiteType; set => websiteType = value; }
        /// <summary> 链接种类 </summary>
        public UrlType UrlType { get { return urlType; } set { urlType = value; bitmapImage = null; } }
        /// <summary> 预览大小 </summary>
        public Size PreviewSize { get; set; }

        #endregion Properties

        #region Constructer

        /// <summary>
        /// 根据网站类型和节点构造一个实例
        /// </summary>
        /// <param name="type">网站类型</param>
        /// <param name="node">XML节点</param>
        public PictureItem(WebsiteType type, XmlNode node)
        {
            Type = type;
            // 初始化为预览链接
            UrlType = ServiceLocator.Current.GetInstance<UserConfigVM>().Config.PictureItemSize > 400 ?
                       UrlType.SampleUrl :
                       UrlType.PreviewUrl;
            // 用网站特异性的方法来设置具体信息
            WebsiteHelper.SetInfoFromNode(this, node, Type);
        }

        /// <summary>
        /// 静态方法批量构造实例
        /// </summary>
        /// <param name="type">网站类型</param>
        /// <param name="xmlString">XML字符串</param>
        /// <param name="loadAll">加载信息</param>
        /// <returns></returns>
        public static List<PictureItem> GetPictureItems(WebsiteType type, string xmlString, bool loadAll)
        {
            List<PictureItem> Items = new List<PictureItem>();
            try
            {
                XmlDocument xml = new XmlDocument();
                // 加载XML字符数据
                xml.LoadXml(xmlString);

                // 获取xml文件里面包含图片的xml节点
                XmlNodeList nodeList = xml.GetElementsByTagName("post");
                for (int i = 0; i < nodeList.Count; i++)
                {
                    var item = new PictureItem(type, nodeList[i]);
                    //if (!item.IsAllRight)
                    //    throw new Exception("Parse Error");

                    if (item.IsAllRight && (loadAll || item.IsSafe))
                    {
                        Items.Add(item);
                    }
                }
                return Items;
            }
            catch (Exception e)
            {
                // show error page
                ServiceLocator.Current.GetInstance<ShellVM>().ErrorMessage = e.ToString();
                return Items;
            }

        }

        #endregion Constructer

        #region ImageSource Properties
        /// <summary>
        /// 根据链接类型打开不同的文件夹
        /// </summary>
        /// <param name="urlType">链接类型</param>
        /// <returns></returns>
        public async Task<StorageFolder> GetStorageFolder(UrlType urlType)
        {
            string folderToken;
            StorageFolder folder;
            // 根据图片Uri类型，打开到不同文件夹里
            if (urlType == UrlType.PreviewUrl)
            {
                folderToken = ServiceLocator.Current.GetInstance<UserConfigVM>().Config.CacheFolderToken;
                folder = await StorageApplicationPermissions.FutureAccessList.GetFolderAsync(folderToken);
                folder = await folder.CreateFolderAsync(GlobalConfig.SampleFolderName, CreationCollisionOption.OpenIfExists);
                folder = await folder.CreateFolderAsync(GlobalConfig.CacheFolderName, CreationCollisionOption.OpenIfExists);
            }
            else
            {
                folderToken = ServiceLocator.Current.GetInstance<UserConfigVM>().Config.SaveFolderlToken;
                folder = await StorageApplicationPermissions.FutureAccessList.GetFolderAsync(folderToken);
                folder = await folder.CreateFolderAsync(GlobalConfig.SampleFolderName, CreationCollisionOption.OpenIfExists);
            }
            // save to each sub folder
            folder = await folder.CreateFolderAsync(Type.ToString(), CreationCollisionOption.OpenIfExists);
            return folder;
        }


        /// <summary>
        /// ImageSource属性用于绑定到列表的Image控件上
        /// </summary>
        public ImageSource ImageSource
        {
            get
            {
                if (bitmapImage != null && bitmapImage.IsAlive)
                {
                    // 如果弱引用没有没回收，则取弱引用的值
                    return (ImageSource)bitmapImage.Target;
                }
                // 弱引用已经被回收那么则进行异步下载
                Uri imageUri = new Uri(UrlType == UrlType.PreviewUrl ? PreviewUrl : SampleUrl);
                // 创建后台线程，下载图片
                Task.Factory.StartNew(async () => { await DownloadImageAsync(imageUri); });
                return null;
            }
        }

        /// <summary>
        /// 下载图片
        /// </summary>
        /// <param name="uri">链接</param>
        /// <returns></returns>
        private async Task DownloadImageAsync(object uri)
        {
            var folder = await GetStorageFolder(UrlType);
            var path = Path.Combine(folder.Path, FileName);

            if (!File.Exists(path) || ((new FileInfo(path).Length) == 0))
            //if (!File.Exists(path))
            {
                if (UrlType == UrlType.PreviewUrl)
                {
                    // 限制同时发起下载次数
                    await Spider.DownloadPictureFromUriToFolderLock(uri as Uri, folder.Path, FileName);
                }
                else
                {
                    await Spider.DownloadPictureFromUriToFolder(uri as Uri, folder.Path, FileName);
                }
            }

            // 在UI线程处理位图和UI更新
            DispatcherHelper.CheckBeginInvokeOnUI(async () =>
            {
                try
                {
                    var file = await StorageFile.GetFileFromPathAsync(path);
                    var stream = await file.OpenReadAsync();
                    var bm = new BitmapImage();
                    await bm.SetSourceAsync(stream);
                    // 把图片位图对象存放到弱引用对象里面
                    if (bitmapImage == null)
                        bitmapImage = new WeakReference(bm);
                    else
                        bitmapImage.Target = bm;
                    //触发UI绑定属性的改变
                    RaisePropertyChanged(() => ImageSource);
                }
                catch (Exception e)
                {
                    // show error page
                    ServiceLocator.Current.GetInstance<ShellVM>().ErrorMessage = e.ToString();
                }
            });
        }

        #endregion ImageSource Properties
    }
}
```